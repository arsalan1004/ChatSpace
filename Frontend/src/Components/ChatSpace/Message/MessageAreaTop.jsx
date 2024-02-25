import React from 'react'
import userAcc from '../../../Assets/Icons/userAcc.svg';
import chatOnline from '../../../Assets/Icons/chatOnline.svg';
const MessageAreaTop = ({receiver, onlineStatus}) => {
  // Same logic as in conversation Component applied here to extract receiver's data
  console.log("In messageTopArea: ");
  console.log(`onlineStatus: ${onlineStatus}`)

  return (
    <div className='bg-transparent flex items-center p-2 gap-x-2 border-b-2 border-b-primary-100'>
      <img src={userAcc} alt='receiver-profile-image' width={40} height={40}/>
      <div>
        <h3 className='font-Montserrat text-primary-100 font-semibold tracking-wide'>{receiver}</h3>
        <div className='font-Itim text-primary-100 text-sm'>

          {
            onlineStatus == true 
           &&  
            (<div className='flex gap-x-2 items-center'>
              <img src={chatOnline} alt='user-online-status' className='w-[20px] h-[20px]' />
              <p>Online</p>
            </div>)
           
          }
         
        </div>
      </div>
    </div>
  )
}

export default MessageAreaTop