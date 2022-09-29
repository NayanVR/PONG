import React from 'react'
import '../styles/chatSection.css'
import ChatBubble from './ChatBubble'

export default function ChatSection({ socket }) {
  return (
    <div className="chatbox-container">
      <div className="room-chat-title-container">
        <h1>Room Chat</h1>
      </div>
      <div className="chats-container">
        <ChatBubble userLetter={"K"} message={"Hello"} isUser={false} />
        <ChatBubble userLetter={"N"} message={"Hello There"} isUser={true} />
      </div>
      <div className="input-container">
        <input id="chat-input" type="text" placeholder="Type a message" />
        <button className="send-btn">Send</button>
      </div>
    </div>
  )
}
