import BlogUserSpecificCard from "./BlogUserSpecificCard";
const UserBlogList = ({ blogs, onUpdate, onDelete,user }) => {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogUserSpecificCard key={blog._id} blog={blog} onUpdate={onUpdate} onDelete={onDelete} user={user} />
        ))}
      </div>
    );
  };
  export default UserBlogList 