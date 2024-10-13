import React, { useEffect } from 'react';

const AlertMessageCompo = ({ message, type, onClose ,setMsgData}) => {
    // Set styles based on the alert type
    console.log(message,type)
    const alertStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
    };
useEffect(()=>{
    setTimeout(()=>{
    setMsgData({message:"",variant:"",f:false})
    },750)
})
    return (
        <div
            className={`fixed bottom-[50px] left-[50%] translate-x-[-50%] p-4 rounded shadow-md z-10 ${alertStyles[type]}`}
            role="alert"
        >
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-lg font-bold">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AlertMessageCompo;