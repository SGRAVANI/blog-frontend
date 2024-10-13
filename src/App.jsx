import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Components/Login'
import Blogs from "./Components/Blogs"
import { Outlet, Route,Routes } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'

import Home from './Components/Home.jsx'
import NavBar from './Components/NavBar.jsx'
import CreateBlog from './Components/CreateBlog.jsx'
import UpdateBlog from './Components/UpdateBlog.jsx'
import DisplayBlogPage from './Components/DisplayBlogs.jsx'
import DisplayBlogDetail from './Components/DisplayBlogs.jsx'
function App() {
 

  return (
    <>
    <div className='max-w-[1350px] mx-auto w-full'>
     <NavBar/>  
     <Outlet/>
     </div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/newblog" element={<CreateBlog/>} />
      <Route path="/blog/:id" element={<DisplayBlogDetail/>} />
      <Route path="/updateblog" element={<UpdateBlog/>} />
     </Routes>
    </>
  )
}

export default App
