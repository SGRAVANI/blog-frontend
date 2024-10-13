import BlogUserSpecificCard from "./BlogUserSpecificCard";
const UserBlogList = ({ blogs, onUpdate, onDelete,user }) => {
    return !blogs?<h1 className="container mx-auto texr-center pt-8 font-semibold text-2xl">You haven't written any blogs yet! </h1>:
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        {blogs.map((blog) => (
          <BlogUserSpecificCard key={blog._id} blog={blog} onUpdate={onUpdate} onDelete={onDelete} user={user} />
        ))}
      </div>
    
  };
  export default UserBlogList 