import React, { useState, useRef, useEffect } from "react";
import './Demo.scss';
import Particles from '../elements/Particles';

function Demo() {
    const [messages, setMessages] = useState([]); // State to store the messages
    const [inputValue, setInputValue] = useState(''); // State to track textarea input
    const [isGenerating, setIsGenerating] = useState(false); // State to track if a message is being generated
    const textareaRef = useRef(null); // Ref to access the textarea

    // Function to handle form submission
    const handleSubmit = async () => {
        if (inputValue.trim() !== '') {
            const userMessage = { text: inputValue, type: 'user' };

            // Append the user message to the bottom of the message list
            setMessages([...messages, userMessage]);

            // Disable the textarea while waiting for the response
            setIsGenerating(true);

            // Send the message to FastAPI backend
            const response = await fetch('http://127.0.0.1:8000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();
            const responseMessage = {
                text: data.message,
                type: 'response',
                image_url: data.image_url ? data.image_url : null  // Check if image_url exists
            };

            // Append the backend response after the user message
            setMessages([...messages, userMessage, responseMessage]);

            // Clear textarea after submit
            setInputValue('');
            
            // Re-enable the textarea after receiving the response
            setIsGenerating(false);
        }
    };

    // Function to initialize the conversation by fetching the system's first message
    const initChat = async () => {
        setIsGenerating(true); // Disable textarea at the start

        const response = await fetch('http://127.0.0.1:8000/initChat', {
            method: 'GET',
        });

        const data = await response.json();
        const welcomeMessage = {
            text: data.message,
            type: 'response',
            image_url: data.image_url ? data.image_url : null  // Check if image_url exists
        };

        // Set the initial welcome message
        setMessages([welcomeMessage]);

        // Re-enable textarea after welcome message is set
        setIsGenerating(false);
    };

    // Utility function to convert newlines to <br /> tags and render image if present
    const renderMessageWithNewlines = (message) => {
        return (
            <div>
                {/* Render the portrait image if available */}
                {message.image_url && (
                    <img
                        src={message.image_url}
                        alt="Character portrait"
                        className="characterPortrait"
                        style={{ maxWidth: '200px', marginBottom: '10px' }}
                    />
                )}
                {/* Render the text with newlines */}
                {message.text.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // Handle Enter (submit) and Shift+Enter (newline)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow newline when Shift + Enter is pressed
                return;
            } else {
                // Prevent default Enter behavior and submit the form
                e.preventDefault();
                handleSubmit();
            }
        }
    };

    // Adjust the textarea height dynamically based on content
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = `${Math.min(textarea.scrollHeight, 5 * 24)}px`; // Max height of 5 lines (assuming 24px line height)
        }
    };

    // Send the initial storyteller message when component mounts
    useEffect(() => {
        initChat(); // Initialize the chat by calling the FastAPI `/initChat` route
    }, []);

    useEffect(() => {
        // Adjust textarea height on initial render (if there is any preloaded content)
        handleInput();
    }, [inputValue]);

    return (
        <div className='topContainer'>
            <div className="chatDisplay">
                <div className="chatContainer">
                    {/* Display the submitted messages */}
                    <div className="messageList">
                        {messages.length > 0 ? (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={
                                        message.type === 'user'
                                            ? 'messageItemUser'
                                            : 'messageItemResponse'
                                    }
                                >
                                    {renderMessageWithNewlines(message)}
                                </div>
                            ))
                        ) : (
                            <div className="messageItemResponse">
                                Generating text...
                            </div>
                        )}
                    </div>

                    {/* Form for submitting messages */}
                    <form className="chatForm" onSubmit={(e) => e.preventDefault()}>
                        <div className="inputWrapper">
                            <textarea
                                ref={textareaRef}
                                className="chatInput"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    handleInput(); // Dynamically adjust height as the user types
                                }}
                                onKeyDown={handleKeyDown} // Handle Enter and Shift+Enter
                                onInput={handleInput} // Trigger dynamic resizing
                                placeholder="What are you gonna do?"
                                rows="1"
                                style={{ overflowY: 'auto', lineHeight: '24px', maxHeight: '200px' }} // Set a max height equivalent to 5 lines
                                disabled={isGenerating} // Disable textarea if generating
                            />
                            <button
                                type="button"
                                className="submitButton"
                                onClick={handleSubmit}
                                disabled={isGenerating} // Disable button while generating
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Ensure Particles have a lower z-index so they don't block elements */}
            <Particles style={{ zIndex: 0 }} />
        </div>
    );
}

export default Demo;
