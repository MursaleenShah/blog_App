import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 

  const [posts, setPosts] = useState([]);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);
  const handleLogout = () => {
    logout();      
    navigate("/login"); 
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full mx-auto bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform transition-all border border-white border-opacity-20">
        
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">All Posts</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600">Explore our community content</p>
          </div>

          {user?.role === "admin" && (
      <button
        onClick={() => navigate("/admin")}
        className="py-2 px-4 rounded-lg text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
      >
        Admin Dashboard
      </button>
    )}

          {user && (
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
            >
              Logout
            </button>
          )}
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300 transition-colors hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-4">By {post.author?.name}</p>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-600">No posts available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
