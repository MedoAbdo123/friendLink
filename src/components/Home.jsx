import { useEffect, useState } from "react";
import ShowComments from "./comments/ShowComments";
import { LuSend } from "react-icons/lu";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import DeletePost from "../posts/DeletePost";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [posts, setPosts] = useState([]);
  const [activePost, SetActivePost] = useState(null);
  const [showAlert, setShowAlert] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null);
  const [comment, setComment] = useState("")
  const [refreshComments, setRefreshComments] = useState(false);

  const token = localStorage.getItem("token")
  let decode = null;


  if (token) {
    try {
      decode = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/posts/getPosts", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setPosts(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  async function addComment(postId) {
    const response = await fetch(`http://localhost:3000/comments/addComment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text: comment })
    });

    if (response.ok) {
      setComment("");
      setRefreshComments(prev => !prev);
    } else {
      console.error("Failed to add comment");
    }
  }


  return (
    <div className="text-start">
      <Navbar />
      {showAlert && (
        <AnimatePresence>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 1 }}
            transition={{ duration: .8, ease: "easeOut" }}
            className="fixed flex justify-center w-full z-50"
          >
            <div className="relative">
              <DeletePost postId={postToDelete} onClose={() => setShowAlert(false)} />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="flex justify-center items-center flex-col p-4">
        {posts.map((post) => (
          <div
            post-id={post._id}
            key={post._id}
            className="bg-amber-100 relative max-w-[800px] w-full mt-12 rounded-2xl flex flex-col p-4 group"
          >
            {decode && post.userId == decode.id && (
              <button
                onClick={() => {
                  setPostToDelete(post._id);
                  setShowAlert(true);
                }}
                className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-[.3rem] hidden group-hover:block transition duration-300"
              >
                <MdDelete />
              </button>

            )} {decode && post.userId == decode.id && (
              <Link to={`editPost/${post._id}`}>
                <button
                  className="absolute bottom-4 right-18 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-[.3rem] hidden group-hover:block transition duration-300"
                >
                  <RiEditBoxFill />
                </button>
              </Link>
            )}
            <div className="flex justify-end items-center">
              <Link to={decode && post.userId == decode.id ? "/myProfile" : `/${post.userId}`}>
                <h3 className="text-black text-start mr-4 font-bold hover:cursor-pointer hover:underline">
                  {post.username}
                </h3>
              </Link>
              <img src={post.profile} className="w-10 h-10 rounded-full" />
            </div>

            <div className="text-black ml-3 font-bold w-full text-wrap flex flex-col">
              <h3 className="text-wrap ">{post.title}</h3>
              <hr className="my-2" />
              <h4>{post.body}</h4>
            </div>
            {post.image && post.image !== "" && (
              <div className="mt-5 p-2 max-w-full rounded-lg">
                <img
                  src={post.image}
                  className="w-[100%] rounded-lg object-contain max-h-180"
                  alt="Post"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            <div className="flex justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="hover:cursor-pointer mt-5 m-2"
                onClick={() =>
                  SetActivePost(activePost == post._id ? null : post._id)
                }
              >
                <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
              <span className="mt-5">{post.__v}</span>
            </div>
            {activePost === post._id && (
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="bg-white min-w-full min-h-[100%] app-comment sm:min-h-[90%] sm:min-w-[80%] flex p-5 rounded-lg shadow-lg flex-col items-center relative">
                  <button
                    className="absolute top-1 right-1 text-black px-3 py-1 rounded-md text-4xl"
                    onClick={() => SetActivePost(null)}
                  >
                    ×
                  </button>

                  <div className="w-full flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto p-4 pb-16">
                      <ShowComments postId={post._id} refreshComments={refreshComments} />
                    </div>
                    <div className="bg-gray-200 w-full  flex items-center px-1 py-3 absolute bottom-0 left-0">
                      <input
                        type="text"
                        className="w-full outline-gray-700 border-2 border-gray-500 p-3 bg-transparent text-black rounded-lg flex-grow break-words whitespace-pre-wrap"
                        placeholder="Add Comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addComment(post._id, e);
                          }
                        }}
                      />
                      <button
                        onClick={() => addComment(post._id)}
                        className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer transition-all text-white px-4 py-2 rounded-md ml-2 flex items-center gap-2"
                      >
                        <span>
                          <LuSend />
                        </span>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;