import React from 'react'
import io from 'socket.io-client'
import './SimpleChat.css'
import Modal from '../Modal/Modal'

const SimpleChat = () => {
  const [chats, updateChats] = React.useState([])
  const [userName, setUsername] = React.useState(false)
  const [tempUserName, setTempUsername] = React.useState('')
  const [newChat, updateNewChat] = React.useState('')
  const [socket, setSocket] = React.useState({ on: () => {}, off: () => {} })

  const listElements = React.createRef()
  const chatInput = React.createRef()
  const nameInput = React.createRef()

  React.useEffect(() => {
    setSocket(io())
  }, [])

  React.useEffect(() => {
    let unsub = [];
    ['chat message', 'welcome message'].forEach((event, index) => {
      socket.on(event, (name, msg) => {
        updateChats([...chats, <p key={index}><span className='chatName'>{name}: </span>{msg}</p>])
      })
      unsub.push(() => { socket.off(event) })
    })

    if (userName) {
      chatInput.current.focus()
    } else {
      nameInput.current.focus()
    }

    return () => {
      unsub.forEach(func => { func() })
    }
  })
  React.useLayoutEffect(() => { listElements.current?.scrollIntoView() }) // eslint-disable-line
  function handleChange (e) {
    updateNewChat(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (newChat === '') { return }
    socket.emit('chat message', userName, newChat)
    e.target.querySelector('input').value = ''
    updateNewChat('')
  }

  function handleSetUsernameChange (e) {
    setTempUsername(e.target.value)
  }
  function handleCloseUsernameModal (e) {
    e.preventDefault()
    setUsername(tempUserName)
    socket.emit('welcome message', tempUserName)
  }

  const chatsUI = chats.map((chat, i) => <li key={i} ref={listElements}>{chat}</li>)
  return (
    <div className='outer'>
      {!userName &&
        <Modal onClose={handleCloseUsernameModal}>
          <form className='nameForm' onSubmit={handleCloseUsernameModal}>
            <label htmlFor='unInput'>What should we call you?</label>
            <input id='unInput' onChange={handleSetUsernameChange} type='text' ref={nameInput} />
            <button type='submit'>Send</button>
          </form>
        </Modal>}
      <ul id='messages' className='messages'>{chatsUI}</ul>
      <form className='chatForm' onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' ref={chatInput} />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default SimpleChat
