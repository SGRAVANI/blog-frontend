
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DisplayBlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
    //   const response = await fetch(`http://localhost:8000/api/v1/user/getblogbyid/${id}`);
    const response = await fetch(`https://blog-backend-veru.onrender.com/api/v1/user/getblogbyid/${id}`);
      const data = await response.json();
      setBlog(data.data);
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-[1350px] mx-auto px-5 sm:px-20 pt-[11vh]">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        
        {/* Main Blog Image */}
        <img src={blog.image} alt={blog.title} className="w-full h-72 object-cover mb-4" />

        {/* Subheading */}
        <h2 className="text-lg text-gray-600 mb-2">{blog.subheading}</h2>
        
        {/* Content */}
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
        />

        {/* Additional Image (optional, if there's another image in the blog) */}
        {blog.additionalImage && (
          <img src={blog.additionalImage} alt="Additional content" className="w-full h-72 object-cover mb-4" />
        )}

        {/* Publish Date */}
        <p className="text-gray-500 text-sm">{`Published on: ${new Date(blog.createdAt).toLocaleDateString()}`}</p>
      </div>
    </div>
  );
};

export default DisplayBlogDetail;
