import React from 'react'
import safwaatLogoGreen from '../../../Assets/Icons/safwaatLogoGreen.svg';
import userAcc from '../../../Assets/Icons/userAcc.svg';
import { useNavigate } from 'react-router-dom';
import whiteLogo from '../../../Assets/whiteLogo.png';
import boy from '../../../Assets/Images/boy.png';

const ChatHeader = ({user}) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  }

  return (
    <header 
    className='w-full bg-gradient-to-b from-[#1E5054] to-[#56A8AE]'>
      <div className='chatheader-shadow-bottom flex justify-between items-center py-1 px-6 border-b-2 border-b-primary-100'>
        <div className='flex items-center gap-x-4'>
          <div className="hover:scale-110 transition-all cursor-pointer" onClick={navigateToHome}>
            <img src={whiteLogo} alt='safwaat-logo' width={50} height={50}/>
          </div>
          <h1 className='font-Poppins font-bold text-primary-100 tracking-wide'>ChatSpace</h1>
        </div>
        <div className='flex items-center gap-x-2'>
          <div>
                <img src={boy} alt='userImage' className='relative z-10 bg-[#6BB4C5] rounded-full
                            w-[40px] h-[40px] mt-1 mr-1 '
                />
          </div> 
          <div className='flex flex-col pr-2'>
            <p className='text-primary-100 font-Roboto text-sm tracking-wide font-bold'>{user?.fullName || "no fullname"}</p>
            <p className='text-primary-100 font-Roboto text-[12px] font-regular tracking-wide'>@{user?.username || "no username"}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader