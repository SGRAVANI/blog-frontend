
import React, { useEffect, useState } from 'react';
import { Context } from './ContextData/ContextData';
import { useContext } from 'react';
import UserBlogList from './UserBlogList';
import ConfirmAlert from './ConformAlert';
import AlertMessageCompo from './AlertMessageCompo';
import CreateBlog from './CreateBlog';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [greeting, setGreeting] = useState('');
    const [displayAlert,setDisplayAlert]=useState(false);
    const[delteConfirmation,setDeleteConfirmation]=useState({id:'',status:false})
    const [msgData,setMsgData]=useState({message:"",variant:"",f:""})
    let cont=useContext(Context)
   //let user=JSON.parse(localStorage.getItem("user"))
   let [user,setUser]=useState(null)
   let [f,setF]=useState(false)
   
   let navigate=useNavigate()
   useEffect(() => {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }
}, []);
  // console.log(cont.userData,"cont")
    useEffect(() => {
        // Fetch blogs from the backend

        // const fetchBlogs = async () => {
        //     // const response = await fetch('https://blog-backend-veru.onrender.com/api/v1/getblogs');
        // try{
        //     const response = await fetch('http://localhost:8000/api/v1/user/getblogs');
        //     const data = await response.json();
        //     setBlogs(data.data);
        //     console.log("data of blogs",data)
        // }
        // catch(e)
        // {
        //     console.log(e.message)
        // }
        // };
        
        const fetchBlogs = async () => {
            if (!user) return; 
            // const response = await fetch('https://blog-backend-veru.onrender.com/api/v1/getblogs');
        try{
            // const response = await fetch(`http://localhost:8000/api/v1/user/getuserblogs?userId=${user._id}`, {
                const response = await fetch(`https://blog-backend-veru.onrender.com/api/v1/user/getuserblogs?userId=${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });            
            
            const data = await response.json();
            setBlogs(data.data);
            console.log("data of blogs",data)
           
        }
        catch(e)
        {
            console.log(e.message)
        }
        };
        // Set a greeting message
        if(user)
        {
        const userName =user.name // Replace this with the actual user's name from login
        setGreeting(`Welcome, ${userName}!`);
        
        fetchBlogs();
        }
    }, [f,user]);
  

   function handleDelete(id)
  {setDisplayAlert(true)
   setDeleteConfirmation({id:id,status:true})
    }
  function handleUpdate(id)
  {
   // console.log(id)
    cont.setBlogId(id);
    navigate("/updateblog")
   //setF(!f)
  }


 async function handleConfirm()
    {
        setDisplayAlert(false)
       // setMsgData({message:"",variant:"",f:false})
        if(delteConfirmation.status)
        {      console.log(delteConfirmation)
        try {
            console.log(`http://localhost:8000/api/v1/user/deleteblog/${delteConfirmation.id}`)
            //https://blog-backend-veru.onrender.com
            // const response =await fetch(`http://localhost:8000/api/v1/user/deleteblog/${delteConfirmation.id}`, {
                const response =await fetch(`https://blog-backend-veru.onrender.com/api/v1/user/deleteblog/${delteConfirmation.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
             console.log(response)
            if (!response.ok) {
                setMsgData({msg:"Error occured while deleting",variant:"error",f:true})
                throw new Error('Failed to delete the blog');
            }
    
            const data = await response.json();
           alert("deleted")
           setMsgData({message:"blog is deleted",variant:"success",f:true})
            console.log(data.message); // Handle success message if needed
            setDeleteConfirmation({status:false,id:''})
            setF(!f); // Update the state or UI after successful deletion
           
           
        } catch (error) {
            setMsgData({msg:"Error occured while deleting",variant:"error",f:true})
            console.error('Error deleting blog:', error);
        }
        
        
        }
    }
    function handleCancel()
    {setDeleteConfirmation({status:false,id:''})
     setAlert(false)
    }
    function handleCloseMsgData()
    {
        setMsgData({message:'',variant:"",f:false})
    }
    return (
        <>
        <div className="pt-[11vh] py-5 mx-auto max-w-[1350px] w-full sm:px-20 px-10">
            <h1 className="text-2xl font-bold text-right">{greeting}</h1>
            <div className='flex justify-end'>
             {/* <CreateBlog  user={user} f={f} setF={setF} /> */}
             <button onClick={()=>{navigate("/newblog")}} className='mt-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'>Create New Blog</button>
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Your Blogs</h2>
               
                <UserBlogList onDelete={handleDelete} onUpdate={handleUpdate} blogs={blogs} user={user} />
            </div>
            
        </div>
        {msgData.f &&<AlertMessageCompo  message={msgData.message} type={msgData.variant} onClose={handleCloseMsgData} setMsgData={setMsgData} />}
       { displayAlert&&<ConfirmAlert message='Are you sure you want to delete this blog post? This action cannot be undone.' onCancel={handleCancel} onConfirm={handleConfirm}/>}


        </>
    );
};

export default Blogs;
