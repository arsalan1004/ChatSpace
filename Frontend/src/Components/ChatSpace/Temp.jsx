import React, { useState } from 'react'
import PrivateChat from './PrivateChat';

const Temp = () => {
  const [number, setNumber] = useState(0);
  const [submitted, setSubmitted] = useState(false)
  const [user, setUser] = useState(() => ({}));

   // getuserData();
   
    
  const submitHandler = () => {
    setSubmitted(true);
    console.log(number);
    switch (number) {
      case 1:
        setUser(() => ({
          userId: "65901f9ae137a46acf78c715",
          username: "Alex Johnson"
        }))
      break;
      case 2:
        setUser(() => ({
          userId: "659815525ce38b434230fbe0",
          username: "ahad122"
        }))
        break;
      default:
        break;
    }
   
  }
  
  return (
   
      <>
        {
            !submitted ?
            (<div>
            <input
                type='number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
              onClick={() => submitHandler()}
              >Submit</button>
            </div>) : <PrivateChat 
                        currentUser = {number == 1 ? {userId: "65901f9ae137a46acf78c715",username: "Alex Johnson"}  :
                       {userId: "659815525ce38b434230fbe0", username: "ahad122"}

          } 
          />
        }
    </>
    
  )
}

export default Temp