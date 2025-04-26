import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    try {
      if (editingPostId) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${editingPostId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
          body: JSON.stringify(newPost),
        });
      } else {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
          body: JSON.stringify(newPost),
        });
      }

      setNewPost({ title: "", content: "" });
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to create/update post:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setNewPost({ title: post.title, content: post.content });
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full mx-auto bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform transition-all border border-white border-opacity-20">

        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">{editingPostId ? "Edit Post" : "Create New Post"}</p>
        </div>

        <form onSubmit={handleSubmitPost} className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Post Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter post title"
              className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPost.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Post Content</label>
            <textarea
              name="content"
              placeholder="Enter post content"
              className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              value={newPost.content}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingPostId ? "Update Post" : "Create Post"}
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Posts</h2>

          {posts.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-600">No posts available. Create your first post above.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300 transition-colors hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{post.content}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="py-2 px-4 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="py-2 px-4 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
