from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import base64
from fastapi.middleware.cors import CORSMiddleware
import json
import boto3
import uuid
import uvicorn
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dynamodb = boto3.client('dynamodb')
charactersTable = "aidventureCharacters"  # Assuming the table name is correct

@app.post("/addCharacter")
async def add_character(character_name: str, description: str):
    while True:
        character_id = str(uuid.uuid4())

        # Put item into the DynamoDB table
        try:
            response = dynamodb.put_item(
                TableName=charactersTable,
                Item={
                    'id': {'S': character_id},
                    'character_name': {'S': character_name},
                    'description': {'S': description}
                }
            )
            return {"message": "Character added successfully", "character_id": character_id}
        except dynamodb.exceptions.ConditionalCheckFailedException:
            # ID already exists, retry with a new UUID
            continue
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to add character")

class Prompt(BaseModel):
    prompt: str

@app.post("/newCharacterPortrait")
async def new_portrait(prompt: str = Body()):

    API_URL = "https://api-inference.huggingface.co/models/Ertoip/rpg-portrait-generator"
    headers = {"Authorization": "Bearer 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"}
    payload = {        
        "inputs": prompt,
    }
    try:
        response = requests.post(API_URL, headers=headers, json=payload)        
    
        image_bytes = response.content
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
        return json.dumps({"image": image_base64})
    except: 
        return json.dumps({"error": "Failed to generate image"}, status_code=500)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)