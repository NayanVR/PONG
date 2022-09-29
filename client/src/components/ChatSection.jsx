import React, { useState, useEffect } from 'react'
import '../styles/chatSection.css'
import ChatBubble from './ChatBubble'

export default function ChatSection({ socket, username }) {

  const [messages, setMessages] = useState([])
  const [textInput, setTextInput] = useState("")

  useEffect(() => {
    socket.on("chatMessage", (_message, _userLetter) => {
      let newMessages = messages
      newMessages.push({ message: _message, userLetter: _userLetter, isUser: false })
      setMessages(newMessages)
      setTextInput("a")
      setTextInput("")
    });

    return () => {
      socket.off("chatMessage")
    }
  }, [])

  function handleSend() {

    if (textInput === "") return

    const _userLetter = username.toUpperCase()[0]
    const _message = textInput

    let newMessages = messages
    newMessages.push({ message: _message, userLetter: _userLetter, isUser: true })

    setMessages(newMessages)

    socket.emit("chatMessage", _message, _userLetter)

    setTextInput("")
  }

  return (
    <div className="chatbox-container">
      <div className="room-chat-title-container">
        <h1>Room Chat</h1>
      </div>
      <div className="chats-container">
        {messages.map((message, index) => {
          return (
            <ChatBubble key={index} userLetter={message.userLetter} message={message.message} isUser={message.isUser} />
          )
        })}
      </div>
      <div className="input-container">
        <input onChange={e => setTextInput(e.target.value)} value={textInput} id="chat-input" type="text" placeholder="Type a message" />
        <button onClick={handleSend} className="send-btn">Send</button>
      </div>
    </div>
  )
}
