import React from 'react'
import { useNavigate } from 'react-router-dom'


const ChatModeButton = ({img, dimensions, altText, handler}) => {

  
  const onClickHandler = () => {
    handler()
  }

  return (
    <button onClick={onClickHandler} disabled = {altText == 'group-chat' ? true : false}
      className='hover:scale-110 transition-all'
    >  
      <img src={img} alt='' width={dimensions} height={dimensions} />
    </button>
  )
}

export default ChatModeButton


// const ChatModeButton = ({modeText, modeImage, imageDimension,link, chatModeState, onSetChatMode }) => {

//   const navigate = useNavigate();
//   const chatModeSelectHandler = () => {
//     // Handler from Props: would be a navigate
//     onSetChatMode(modeText)
//     navigate(link)
//   }

// //   style={({ isActive }) => ({
// //     borderColor: isActive ? '#EBF9FA' : "#D9D9D9", borderWidth: "3"
// //  })}
//   return (
   
     
//     <button onClick={chatModeSelectHandler}
//       className={`text-accent w-[50%] flex justify-between items-center py-2 px-4 border-[1px] border-b-[3px] ${modeText == chatModeState ? 'border-b-accent' : 'border-x-[#D9D9D9] border-b-[#D9D9D9]'}`} 
//       disabled= {modeText != "Chat" ? true : false}
    
//     >
//     <h2>{modeText || "No modeText"}</h2>
//     <img src={modeImage || "No modeImage"} alt='chat-mode-image' width={imageDimension} height={imageDimension}/>
//     </button>

    
//   )
// }

// export default ChatModeButton