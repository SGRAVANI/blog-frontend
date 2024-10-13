import React from 'react';

const BlogUserSpecificCard = ({ blog, onUpdate, onDelete,user }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden my-4">
      <img
        className="w-full h-48 object-cover"
        src={blog.image || 'https://via.placeholder.com/150'} // Placeholder if no image
        alt="Blog cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.subheading}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Posted by: {user?.name}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => onUpdate(blog._id)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(blog._id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogUserSpecificCard;