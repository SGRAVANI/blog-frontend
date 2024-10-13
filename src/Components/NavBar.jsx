
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//import { useLocalStorage } from './CustomHook/useLocalStorage';
import { useContext } from 'react';
import { Context } from './ContextData/ContextData';
function NavBar() {
  //const [user, setUser] = useLocalStorage('user'); //  custom hook to get/set 'user' from localStorage
  let navigate = useNavigate();
  let cont=useContext(Context)
  return (
    <div className='bg-[white] w-full'>
      <div
        className='flex justify-between items-center max-w-[1350px] w-full border-b-black border-b-[1px] mx-auto gap-3 px-10 sm:px-20 z-10 bg-white'
        style={{ left: '0', right: '0', margin: '0 auto', position: 'fixed', height: '10vh',zIndex:10 }}
      >
        <div>
            <NavLink to="/" className='text-3xl font-bold'>Home</NavLink>
        </div>
        {!cont.userData && (
          <button
            className='px-5 py-2 text-white font-bold bg-gray-950 hover:bg-black hover:text-white transition-all duration-100 text-lg rounded-md'
            onClick={() => navigate('/login')}
          >
            SignIn
          </button>
        )}
        {cont.userData && (
          <button
            className='px-5 py-2 text-white font-bold bg-blue-500 hover:brightness-125 transition-all duration-100 text-lg rounded-md'
            onClick={() => {
              localStorage.removeItem('user'); // update localstorage
              cont.setUserData(null)
              navigate("/")
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
