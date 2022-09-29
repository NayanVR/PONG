import React from 'react'

export default function ChatBubble({ userLetter, message, isUser }) {
    return (
        <div className={`${isUser ? "chat-container user-message" : "chat-container"}`}>
            <div className="chat-user-icon">
                <h2>{userLetter}</h2>
            </div>
            <p className="chat-user-message">
                {message}
            </p>
        </div>
    )
}
