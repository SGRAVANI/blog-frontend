import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
const [location,setLocation]=useState({country:''})
  useEffect(() => {

    const fetchBlogs = async (country) => {
        // const response = await fetch(`http://localhost:8000/api/v1/user/getblogsbycountry?country=${country}`);
        const response = await fetch(`https://blog-backend-veru.onrender.com/api/v1/user/getblogsbycountry?country=${country}`);
        const data = await response.json();
        setBlogs(data.data);
      };

    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=12eab02b76889c'); 
        const data = await response.json();
        const userCountry = data.country; 
        setLocation({ country: userCountry });
        fetchBlogs(userCountry); // Fetch blogs based on location
      } catch (error) {
        console.error('Error fetching IP location:', error);
      }
    };

    fetchLocation();
  }, []);



  return (
    // <div className='pt-[11vh] mx-auto w-full max-w-[1350px] px-[10px] sm:px-[20px]'>   
         <div className="bg-gray-100  ">
      <div className="max-w-[1350px] mx-auto px-[10px] sm:px-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 pt-[11vh]">Latest Blogs</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate(`/blog/${blog._id}`)} // Navigates to the detail page
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h1>
                {/* <div
           className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
        /> */}

<p className="text-gray-700 text-base leading-relaxed mb-4" 
           dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 150) + '...'.trim() }} 
        />


                {/* <p className="text-gray-700 text-base leading-relaxed mb-4">{blog.content.slice(0, 150) + '...'}</p> */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>

  );
};

export default Home;
