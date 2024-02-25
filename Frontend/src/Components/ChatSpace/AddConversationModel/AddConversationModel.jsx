import React, { useEffect, useRef, useState } from 'react';
import styles from './AddConversationModel.module.css';
import ReactDOM from 'react-dom';
import NewChatEntry from './NewChatEntry';
import { getFriendList, getStartNewConversationsData } from '../../../API/chatSpaceApi';
const AddConversationModel = (props) => {
  const [modelHeight, setModelHeight] = useState(0);
  const [friendList, setFriendList] = useState([]);
  const scrollRef = useRef(null)
  const modelExitHandler = () => {
    props.onModelClose();
  }

  const Backdrop = () => {
    return  <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.25)] z-[4]' />
  }

  const data = [
    {
      "username": "Ali",
      "fullname": "@aliKhan",
    },
    {
      "username": "Rehan",
      "fullname": "@aliKhan",
    },
    {
      "username": "Kabir",
      "fullname": "@KabirKhan",
    },
    {
      "username": "Ali",
      "fullname": "@aliKhan",
    },
    {
      "username": "Rehan",
      "fullname": "@aliKhan",
    },
    {
      "username": "Kabir",
      "fullname": "@KabirKhan",
    },
    {
      "username": "Ali",
      "fullname": "@aliKhan",
    },
    {
      "username": "Rehan",
      "fullname": "@aliKhan",
    },
    {
      "username": "Kabir",
      "fullname": "@KabirKhan",
    },
  ]

  const getStartNewConversationsDataHandler = async (idObject) => {
    const response = await getStartNewConversationsData(idObject);
    console.log(response);
  }

  const openChatHandler = (receiverId) => {
    let idObject = {
      receiverId: receiverId,
      senderId: props.user.userId
    }
    console.log("ID OBJECT");
    console.log(idObject);
    // getStartNewConversationsDataHandler(idObject);
  }

  useEffect(() => {
    console.log(`userId In Model: ${props.user.userId}`)


    const getFriendListHandler = async () => {
      const response = await getFriendList(props.user.userId);
      console.log(response);
      setFriendList(response.friends || []);
      console.log("FriendList Set");
    }
    getFriendListHandler();


    if(scrollRef.current) {
      console.log(window.innerHeight * 0.6);
      setModelHeight(window.innerHeight * 0.6);
    }
  }, [])
  




  const ModalOverlay = () => {
    return (
      <div 
        id={styles['add-conversation-model']} 
        className={'flex bg-primary-100 flex-col gap-3 justify-center font-Monteserrat w-[50%] rounded-[25px] p-5 z-[5] min-w-[400px]'}
        
       
        >
       
       <div 
       className={styles['scrollStyle'] + 'border'}
          style={{
            minHeight: `${modelHeight}px`,
            maxHeight: `${modelHeight}px`
          }}
          ref={scrollRef}
        >
        
        {
          friendList 
          ? 
            friendList.map((user, index) => 
              <NewChatEntry 
                key = {index}
                user = {user}
                onOpenChat = {openChatHandler}
              />
            )
         :
         <p className='text-secondary'>Loading Your Friends</p>
        }
        </div>
        
        <button 
          onClick={modelExitHandler} className='text-wrong mt-2 hover:translate-y-[-1px] transition-transform'>
            Continue Chatting
        </button>
    </div>
    )
  }

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
      {ReactDOM.createPortal(<ModalOverlay />, document.getElementById("overlay-root"))}
    </>
  )
}

export default AddConversationModel