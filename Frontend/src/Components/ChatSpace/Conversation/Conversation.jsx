import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import userAcc from '../../../Assets/Icons/userAcc.svg'
import boy from '../../../Assets/Images/boy.png';
import boy2 from '../../../Assets/Images/boy2.png';
import boy3 from '../../../Assets/Images/boy3.png';
import boy4 from '../../../Assets/Images/boy4.png';
import boy5 from '../../../Assets/Images/boy5.png';
import boy6 from '../../../Assets/Images/boy6.png';


const Conversation = ({conversation, currentUser, lastMessage, onSetChat, reciever, userNo}) => {

  // Here will be the id of reciever(2nd member of conv) of conversation
  const [user, setUser] = useState({
    userId: "2",
    username: "Zain"
  });
  const [timeAgo, setTimeAgo] = useState("");

  const lastMessageMaxLen = 30;
  // const [lastMessageMaxLen, setLastMessageMaxLen] = useState(33);




  // useEffect(() => {
  //   const friendId = conversation.members.filter(
  //     (m) => m !== currentUser.userId
  //   );
  //   const getFriend = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8000/api/users/" + friendId[0]
  //       );
  //       setUser(res.data);
  //     } catch (error) {
  //       console.log(`get friend error ${error}`);
  //     }
  //   };
  //   getFriend();
  // }, [currentUser, conversation]);

  const setChatHandler = () => {
    console.log("chat set to: ", conversation);
    onSetChat(conversation || [])
  }

  const formatTimeAgo = (timestamp) => {

    const now = new Date();
    const currentTimeStamp = new Date(timestamp);
    const timeDiff = now - currentTimeStamp;
    if(isNaN(timeDiff)) {
      // console.log("Timestamp Undefined, timeDiff undefined");
      return "";
    }
    // console.log("TimeStamp:", timestamp)
    // console.log("TimeDiff", timeDiff)
    let time = "";

    if (timeDiff < 60000) {
      time =  Math.floor(timeDiff / 1000) + "s";
    } else if (timeDiff < 3600000) {
      time =  Math.floor(timeDiff / 60000) + "m";
    } else if (timeDiff < 86400000) {
      time =  Math.floor(timeDiff / 3600000) + "hr";
    } else {
      time =  Math.floor(timeDiff / 86400000) + "d";
    }
    // console.log("TIME_STAMP_FORMATTED");
    // console.log(time);
    return  time;
  }

 

  useLayoutEffect(() => {
    console.log("SET TIME AGO")
    setTimeAgo(formatTimeAgo(lastMessage.createdAt));
  }, [lastMessage])


  return (
    <div 
      onClick={setChatHandler} 
      className='py-2 border-b-[1px] border-b-[#D3D3D3] cursor-pointer'
     
    >
      <div className='flex px-2 gap-x-3 '>
      <div className='w-[15%]'>
          <img 
              src={userNo == 0 ? boy2 : userNo == 1 ? boy3 : userNo == 2 ? boy4 : boy5  } 
              alt='friend-profile-pic' 
              className='z-[10] bg-[#6BB4C5] rounded-full'
              width={45} height={45}
            /> 
          {/* <img 
            src={boy}
            alt='friend-profile-image' 
            width={45} height={45} 
            className='min-w-[35px] min-h-[35px]' 
          /> */}
      </div>
        <div className='w-[70%]'>
        {
          lastMessage?.text &&
          <div className='flex flex-col justify-center'>
            <h1 className='text-[17px] font-medium'>{reciever || "No User"}</h1>
            <p className='font-thin text-[12px] text-slate-500'> 
              {

                lastMessage?.text?.length > lastMessageMaxLen ? 
                lastMessage?.text.slice(0, lastMessageMaxLen) + "..."  :
                lastMessage.text
              }
              
            </p>
          </div>
        }
        {
          !lastMessage?.text &&
       
          <div className='flex items-center h-[100%]'>
            <h1 className='text-[17px] font-medium'>{reciever || "No User"}</h1>
            <p className='font-thin text-[12px] text-slate-500'> 
              {

                lastMessage?.text?.length > lastMessageMaxLen ? 
                lastMessage?.text.slice(0, lastMessageMaxLen) + "..."  :
                lastMessage.text
              }
              
            </p>
          </div>
        }
        </div>
          <div className='w-[10%] font-thin text-[12px] text-slate-500 leading-[20px]'>
            <time className='flex flex-col'>{timeAgo}</time>
          </div>  
 
        
      </div>
    </div>
  )
}

export default Conversation;

 {/* lastMessage?.text.length > lastMessageMaxLen ? 
              lastMessage?.text.slice(0, lastMessageMaxLen) + "..."  :
              lastMessage.text */}