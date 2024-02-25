import React, { useState } from 'react'
import sendMessage from '../../../Assets/Icons/sendMessage.svg'
import style from './MessageTextArea.module.css'
const MessageTextArea = ({onMessageSubmit}) => {
  const [newMessage, setNewMessage] = useState("");

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if(newMessage.trim().length > 0) {
      onMessageSubmit(newMessage);
      setNewMessage("");
    }
    else {
      setNewMessage("");
    }
  }

  const enterKeyPressedHandler = (e) => {
    if(e.keyCode == 13) {
      sendMessageHandler(e);
    }
  }

  return (
    <form className='w-4/5 flex justify-between items-center bg-primary-100 rounded-[10px] px-4 py-[4px]'>
      <textarea
        placeholder="Type your message here"
        className = {style['message-textarea']}
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        onKeyUp={enterKeyPressedHandler}
      >
      </textarea>
      <button onClick={(e) => sendMessageHandler(e)}>
        <img src={sendMessage} alt='send-message-button' width={30} height={30}/>
      </button>
    </form>
  )
}

export default MessageTextArea