import React from 'react'
import safwaatLogoGreen from '../../Assets/Icons/safwaatLogoGreen.svg';
const ChatInitialScreen = () => {
  return (
    <div className='w-[70%] flex flex-col justify-center items-center text-secondary'>
      <img src={safwaatLogoGreen} alt='safwaat-logo' width={70}/>
      <h3 className='font-bold text-2xl'>Welcome to ChatSpace</h3>
      <p className='text-sm text-[#044577]'>Converse with your in-app friends </p>
    </div>
  )
}

export default ChatInitialScreen