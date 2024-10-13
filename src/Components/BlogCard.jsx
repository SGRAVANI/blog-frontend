import React from 'react'
import { NavLink } from 'react-router-dom'
function BlogCard({img,heading,subheading,user}) {
  return (
    <NavLink>
    <div className='flex w-[300px] flex-col gap-2'>
     <img src={img} className='w-full h-[100px] object-cover'/>
     <p className='text-gray-600 text-xs' >{user.name}</p>
     <h1 className='font-bold text-2xl'>{heading}</h1>
     <h2 className='text-gray-600 text-sm'>{subheading}</h2>
     

     </div>
     </NavLink>
  )
}

export default BlogCard