import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/postId/${postId}`);
        const json = await response.json();
        setTitle(json.title);
        setBody(json.body);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);

    try {
      const response = await fetch(`http://localhost:3000/posts/update/${postId}`, {
        method: "PATCH",
        body: formData
      });

      if (response.ok) {
        navigate("/");
      } else {
        alert("Failed to update the post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className='bg-white min-h-screen flex items-center p-4'>
      <form onSubmit={handleSubmit} className="w-full sm:w-[80%] mx-auto p-6 bg-white rounded-lg shadow border border-gray-400">
        <div className="mb-6">
          <label className="block text-black text-lg text-start font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9e9595]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black text-lg text-start font-bold mb-2">Content</label>
          <textarea
            placeholder="Write your post content here…"
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full text-black p-3 rounded border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#9e9595]"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Post
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-black text-black px-6 py-2 rounded transition-all hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
