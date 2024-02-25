import React, { forwardRef, useEffect, useState } from 'react'



const SearchConversationBar = ({search, setSearch, setSearchAppear, searchAppear}) => {
 
  const [debouncedValue, setDebouncedValue] = useState("");
  
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("search setted");
      setSearch(debouncedValue);
    }, 300);

    return () => clearTimeout(handler);

  }, [debouncedValue]);

  
  const onBlurHandler = () => {
    setSearch("");
    setSearchAppear(false);
  }
  const onChangeHandler = (e) => {
    setDebouncedValue(e.target.value)
  }


  return (
    <form 
      
      className='w-[90%] mx-auto py-4'
    >
      {/* <label htmlFor='search' className='hidden'>Search</label> */}
      <input  
       
        type='text'
        className='w-[100%] mx-auto outline-none rounded-[40px] px-2 py-2 font-Poppins text-[12px] font-regular'
        role='searchbox'
        placeholder='search conversations..'
        value = {debouncedValue}
        onChange={(e) => onChangeHandler(e)}
        onBlur={onBlurHandler}
      />
    </form>
  )
}

export default SearchConversationBar