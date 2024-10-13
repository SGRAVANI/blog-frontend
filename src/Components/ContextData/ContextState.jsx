import React, { useEffect, useState } from 'react'
import { Context } from './ContextData'
function ContextState(props) {
   let [blogId,setBlogId]=useState('')
    let [userData,setUserData]=useState(null)
    useEffect(()=>{
        if(localStorage.getItem('user'))
        {
            let data=localStorage.getItem('user')
            setUserData(JSON.parse(data))
        }
    },[])

  return (
    <Context.Provider value={{userData,setUserData,blogId,setBlogId}} >
        {props.children}
        
        </Context.Provider>
  )
}

export default ContextState