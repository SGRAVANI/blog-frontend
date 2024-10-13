// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useNavigate } from 'react-router-dom';

// const CreateBlog = () => {
//     const [locationData,setLocationData]=useState({city:"",country:"",state:""})
//     let user=JSON.parse(window.localStorage.getItem("user"))
//     const [newBlog, setNewBlog] = useState({
//         title: '',
//         image: '',
//         content: '',
//         subheading: '',
//         labels: '',
//         userId:user._id,
//         location:{country:'',city:"",state:""}
//     });
//     const navigate = useNavigate();

//     useEffect(()=>{
//         async function getLocation()
//          {
//             fetch('https://ipinfo.io/json?token=12eab02b76889c')
//             .then((response) => response.json())
//             .then((data) => {
//               console.log("IP Data: ", data);
//               console.log("IP Address: ", data.ip);
//               console.log("Location: ", data.city + ', ' + data.region + ', ' + data.country);
//               console.log("Coordinates: ", data.loc); // latitude, longitude
//               setLocationData({city:data.city,state:data.state,country:data.country})
//               setNewBlog((prev)=>{return{
//                 ...prev,location:{country:data.country,city:data.city,region:data.region}
//               }})
//             })
//             .catch((error) => {
//               console.error('Error fetching IP location:', error);
//             });
//         }
//         getLocation()
      
//       },[])



  

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewBlog((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleContentChange = (value) => {
//         setNewBlog((prev) => ({
//             ...prev,
//             content: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response =await fetch('http://localhost:8000/api/v1/user/addblog', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newBlog),
//         });

//         if (response.ok) {
//             alert('Blog created successfully');
//             //onBlogPosted();
            
//             navigate('/blogs'); // Redirect to blogs page after successful post
//         } else {
//             alert("failed to create blog")
//             console.error('Failed to create blog');
//         }
//     };

//     return (
//         <div className='pt-[12vh] max-w-[1350px] px-10 sm:px-20 mx-auto w-full '>
//         <div className=" bg-white border rounded-lg shadow-lg py-5 px-[10px]  ">
//             <h2 className="text-2xl font-semibold">Create New Blog</h2>
//             <form onSubmit={handleSubmit} className="mt-4 ">
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Blog Title"
//                     value={newBlog.title}
//                     onChange={handleChange}
//                     className="border p-2 w-full mb-2"
//                     required
//                 />
//                 {/* <input
//                     type="text"
//                     name="image"
//                     placeholder="Image URL"
//                     value={newBlog.image}
//                     onChange={handleChange}
//                     className="border p-2 w-full mb-2"
//                     required
//                 /> */}
//                 <input
//                  type="file"
//                     name="image"
//                     onChange={handleFileChange}  // Create this function to handle file selection
//                     className="border p-2 w-full mb-2"
//                         required
// />
//                 <input
//                     type="text"
//                     name="subheading"
//                     placeholder="Subheading"
//                     value={newBlog.subheading}
//                     onChange={handleChange}
//                     className="border p-2 w-full mb-2"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="labels"
//                     placeholder="Labels (comma-separated)"
//                     value={newBlog.labels}
//                     onChange={handleChange}
//                     className="border p-2 w-full mb-2"
//                 />
//                 <ReactQuill
//                     value={newBlog.content}
//                     onChange={handleContentChange}
//                     className="mb-4"
//                     style={{ height: '250px' }} 
//                 />
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-20 sm:mt-10"> 
                
//                     Post Blog
//                 </button>
//                 <button onClick={()=>navigate("/blogs")} className="ml-4 bg-gray-300 text-black p-2 rounded mt-20 sm:mt-10">
//                     Cancel
//                 </button>
//             </form>
//         </div>
//         </div>
//     );
// };

// export default CreateBlog;
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [locationData, setLocationData] = useState({ city: '', country: '', state: '' });
  let user = JSON.parse(window.localStorage.getItem('user'));

  const [newBlog, setNewBlog] = useState({
    title: '',
    image: '',
    content: '',
    subheading: '',
    labels: '',
    userId: user._id,
    location: { country: '', city: '', state: '' }
  });

  const [file, setFile] = useState(null); // To handle file upload

  const navigate = useNavigate();

  useEffect(() => {
    async function getLocation() {
      fetch('https://ipinfo.io/json?token=12eab02b76889c')
        .then((response) => response.json())
        .then((data) => {
          console.log('IP Data: ', data);
          console.log('IP Address: ', data.ip);
          console.log('Location: ', data.city + ', ' + data.region + ', ' + data.country);
          console.log('Coordinates: ', data.loc); // latitude, longitude
          setLocationData({ city: data.city, state: data.state, country: data.country });
          setNewBlog((prev) => ({
            ...prev,
            location: { country: data.country, city: data.city, state: data.region }
          }));
        })
        .catch((error) => {
          console.error('Error fetching IP location:', error);
        });
    }
    getLocation();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setNewBlog((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('subheading', newBlog.subheading);
    formData.append('content', newBlog.content);
    formData.append('labels', newBlog.labels);
    formData.append('image', file); // Attach the file
    formData.append('userId', newBlog.userId);
    formData.append('location', JSON.stringify(newBlog.location)); // Location as string

    // const response = await fetch('http://localhost:8000/api/v1/user/addblog', {
        const response = await fetch('https://blog-backend-veru.onrender.com/api/v1/user/addblog', {
      method: 'POST',
      body: formData, // Sending form data (including the file)
    });

    if (response.ok) {
      alert('Blog created successfully');
      navigate('/blogs'); // Redirect to blogs page after successful post
    } else {
      alert('Failed to create blog');
      console.error('Failed to create blog');
    }
  };

  return (
    <div className="pt-[12vh] max-w-[1350px] px-10 sm:px-20 mx-auto w-full ">
      <div className="bg-white border rounded-lg shadow-lg py-5 px-[10px]">
        <h2 className="text-2xl font-semibold">Create New Blog</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <label>JPG/PNG files are premitted</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="subheading"
            placeholder="Subheading"
            value={newBlog.subheading}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="labels"
            placeholder="Labels (comma-separated)"
            value={newBlog.labels}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <ReactQuill
            value={newBlog.content}
            onChange={handleContentChange}
            className="mb-4"
            style={{ height: '250px' }}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-20 sm:mt-10">
            Post Blog
          </button>
          <button
            onClick={() => navigate('/blogs')}
            className="ml-4 bg-gray-300 text-black p-2 rounded mt-20 sm:mt-10"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;