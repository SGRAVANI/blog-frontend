import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Context } from './ContextData/ContextData';
import { useContext } from 'react';
const UpdateBlog = () => {
    //const [locationData,setLocationData]=useState({city:"",country:"",state:""})
    // let user=JSON.parse(window.localStorage.getItem("user"))
    let cont=useContext(Context)
    let id=cont.blogId;
    const [blog, setBlog] = useState({
        title: '',
        image: '',
        content: '',
        subheading: '',
        labels: '',
        userId:'',
        location:{country:'',city:"",state:""},
        //userId:user._id,
        //location:{country:'',city:"",state:""}
    });
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(cont.blogId)
      async  function fetchBlog()
       {
       
                    // const response = await fetch('https://blog-backend-veru.onrender.com/api/v1/getblogs');
        try{
            const response = await fetch(`https://blog-backend-veru.onrender.com/api/v1/user/getblogbyid/${cont.blogId}`);
            const data = await response.json();
            setBlog(data.data);
            setBlog((prev)=>{return {...prev,labels:prev.labels.join(',')}})
            console.log("data of blogs",data)
        }
        catch(e)
        {
            console.log(e.message)
        }
        
       
    }

    fetchBlog()
      },[])



  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContentChange = (value) => {
        setBlog((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response =await fetch(`http://localhost:8000/api/v1/user/updateblog/${cont.blogId}`, {
            const response =await fetch(`https://blog-backend-veru.onrender.com/api/v1/user/updateblog/${cont.blogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });

        if (response.ok) {
            alert('Blog updated successfully');
            //onBlogPosted();
            
            navigate('/blogs'); // Redirect to blogs page after successful post
        } else {
            alert("failed to create blog")
            console.error('Failed to create blog');
        }
    };

    return (
        <div className='pt-[12vh] max-w-[1350px] px-10 sm:px-20 mx-auto w-full '>
        <div className=" bg-white border rounded-lg shadow-lg py-5 px-[10px]  ">
            <h2 className="text-2xl font-semibold">Create New Blog</h2>
            <form onSubmit={handleSubmit} className="mt-4 ">
               <label htmlFor='title'>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={blog.title}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                    required
                    id="title"
                />
                <label htmlFor='imageURL'>Image URL  </label>
                <input
                    id='imageURL'
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={blog.image}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                    disabled
                    
                />
                <label htmlFor='subheading'>Subheading </label>
                <input
                id='subheading'
                    type="text"
                    name="subheading"
                    placeholder="Subheading"
                    value={blog.subheading}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                    required
                />
                <label htmlFor='labels'>Labels</label>
                <input
                id='labels'
                    type="text"
                    name="labels"
                    placeholder="Labels (comma-separated)"
                    value={blog.labels}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <label>Body</label>
                <ReactQuill
                    value={blog.content}
                    onChange={handleContentChange}
                    className="mb-4"
                    style={{ height: '250px' }} 
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-20 sm:mt-10"> 
                
                    Update Blog
                </button>
                <button onClick={()=>navigate("/blogs")} className="ml-4 bg-gray-300 text-black p-2 rounded mt-20 sm:mt-10">
                    Cancel
                </button>
            </form>
        </div>
        </div>
    );
};

export default UpdateBlog;
