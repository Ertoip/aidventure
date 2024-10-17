from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from typing import Dict, List
import chromadb  # Import ChromaDB
import chromadb.utils.embedding_functions as embedding_functions  # Embedding functions
import pkg_resources

# Get the list of installed packages
installed_packages = pkg_resources.working_set

# Export the list to a file
with open("installed_packages.txt", "w") as f:
    for package in installed_packages:
        f.write(f"{package.key}=={package.version}\n")

# Initialize OpenAI Client for Chat Completions
client = OpenAI(
    api_key="sk-fMEc5NNY_QaOeGDWAPJVTi7jzbDbS2FOohEPeTVeROT3BlbkFJf1Xm4LZIrdALTCIn_UJStEaWu3eKtscqmufLD9dWsA"
)

# Initialize ChromaDB client
chroma_client = chromadb.Client()

# Initialize OpenAI embedding function for ChromaDB
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-fMEc5NNY_QaOeGDWAPJVTi7jzbDbS2FOohEPeTVeROT3BlbkFJf1Xm4LZIrdALTCIn_UJStEaWu3eKtscqmufLD9dWsA",
    model_name="text-embedding-3-small"
)

# Create a collection for conversation history
collection = chroma_client.create_collection(name="conversation_history", embedding_function=openai_ef)


# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust according to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request model
class MessageRequest(BaseModel):
    message: str

# Define the response model
class MessageResponse(BaseModel):
    message: str

# Define a function to store conversation in ChromaDB
def store_conversation(message: str, role: str):
    collection.add(
        documents=[message],
        metadatas=[{"role": role}],
        ids=[str(len(collection.get()["ids"]))]
    )

# Function to retrieve top 20 most relevant conversations
def retrieve_top_conversations(message: str):
    # Query the ChromaDB collection for top 20 relevant messages
    results = collection.query(
        query_texts=[message],
        n_results=20
    )
    
    context = []
    
    for i in range(len(results["metadatas"][0])):
        context.append({"role":results["metadatas"][0][i]["role"], "content":results["documents"][0][i]})
    
    return context

# Route to initialize the chat
@app.get("/initChat", response_model=MessageResponse)
async def init_chat():
    # Add the initial storyteller system message
    system_message = "You are a storyteller. Your job is to narrate interesting stories for the user. Begin by describing an initial situation and the protagonist. After each response, always ask: 'What do you want to do next?'"
    
    # Store the system message in ChromaDB
    store_conversation(system_message, role="system")

    # Generate initial response from GPT
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "system", "content": system_message}]
    )
    
    assistant_response = response.choices[0].message.content
    
    # Store assistant's response
    store_conversation(assistant_response, role="assistant")

    return {"message": assistant_response}

# Route to handle user messages
@app.post("/send-message", response_model=MessageResponse)
async def send_message(msg: MessageRequest):
    # Store user's message in ChromaDB
    store_conversation(msg.message, role="user")

    # Retrieve top 20 relevant conversations
    context = retrieve_top_conversations(msg.message)

    # Add user's message to context
    context.append({"role": "user", "content": msg.message})
    print(context)    
    # Send to GPT-4 model to maintain context
    response = client.chat.completions.create(
        model="gpt-4",
        messages=context
    )
    
    assistant_response = response.choices[0].message.content
    
    # Store assistant's response
    store_conversation(assistant_response, role="assistant")

    return {"message": assistant_response}

# To run the server, use the following command:
# uvicorn main:app --reload
