import React from 'react'
import io from 'socket.io-client'
import './SimpleChat.css'

const socket = io(window.location.hostname + ':4000')
const SimpleChat = () => {

  const [chats, updateChats] = React.useState([])
  const [newChat, updateNewChat] = React.useState('')
  React.useEffect(() => {
    socket.on('chat message', (msg) => {
      updateChats([...chats, msg])
    })
  })

  function handleChange(e) {
    updateNewChat(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    socket.emit('chat message', newChat);
    e.target.querySelector('input').value = ''
    updateNewChat('')
  }

  const chatsUI = chats.map((chat, i) => <li key={i}>{chat}</li>)
  return (
    <div className="outer">
      <ul className="messages">{chatsUI}</ul>
      <form className="form" onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text"/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default SimpleChat
