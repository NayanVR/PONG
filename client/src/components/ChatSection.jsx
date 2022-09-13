import React from 'react'
import '../styles/chatSection.css'

export default function ChatSection() {
  return (
    <div className="chatbox-container">
        <div className="room-chat-title-container">
          <h1>Room Chat</h1>
        </div>
        <div className="chats-container">
          <div className="chat-container">
            <div className="chat-user-icon">
              <h2>K</h2>
            </div>
            <p className="chat-user-message">Hi</p>
          </div>
          <div className="chat-container user-message">
            <div className="chat-user-icon">
              <h2>N</h2>
            </div>
            <p className="chat-user-message">Hello</p>
          </div>
        </div>
        <div className="input-container"></div>
    </div>
  )
}
