import React from 'react'
import boy from '../../../Assets/Images/boy.png'
const NewChatEntry = (props) => {

  const openChatHandler = () => {
    props.onOpenChat(props.user.id)
  }

  return (
    <div className='flex justify-between gap-y-1'>
      <div className='flex gap-x-2'>
        <div className=''>
          <img 
              src={boy} 
              alt='friend-profile-pic' 
              className='z-[10] bg-[#6BB4C5] rounded-full w-[50px] h-[50px]'
              
            /> 
        
        </div>
        <div className='flex flex-col'>
          <p>{props.user.username}</p>
          <p>{props.user.fullName}</p>
        </div>
      </div>
      <button 
        className='my-2 px-2 rounded-[15px] border-2 border-secondary text-secondary bg-primary-100 hover:bg-secondary hover:text-primary-100'
        onClick={openChatHandler}
        style={{
          transition: "color 0.5s"
        }}
      >
        OpenChat
      </button>
    </div>
  )
}

export default NewChatEntry