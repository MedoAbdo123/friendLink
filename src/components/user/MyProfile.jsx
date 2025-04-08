import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import ShowComments from "../comments/ShowComments";
import { LuSend } from "react-icons/lu";
import EditProfile from "./EditProfile";
function MyProfile() {
  const token = localStorage.getItem("token");
  const decode = token ? jwtDecode(token) : null;
  const [posts, setPosts] = useState([]);
  const [activePost, SetActivePost] = useState(null);
  const [showEditProfile, SetShowEditProfile] = useState(null);

  useEffect(() => {
    async function getMyPosts() {
      const response = await fetch(`http://localhost:3000/posts/getPosts/${decode.id}`, {
        method: "GET"
      });
      const json = await response.json();
      setPosts(json.posts);
    }
    getMyPosts();
  }, []);
  return (
    <div className="container mx-auto max-w-3xl h-screen mt-10 p-4">
      {showEditProfile && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.59)] bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-100">
            <EditProfile onClose={() => SetShowEditProfile(false)}/>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <img
          src={decode?.profile || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4"
        />

        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">{decode.username}</h1>
          </div>
          <button className="border border-gray-400 px-4 py-1 rounded-lg text-sm hover:bg-gray-700" onClick={() => SetShowEditProfile(!showEditProfile)}>
            Edit Profile
          </button>
        </div>
      </div>

      <p className="mt-4 text-start text-gray-100">
      <span className="block">posts: {posts.length}</span>
      Digital creator | Photography enthusiast | Travel lover
      </p>
      <div className="p-4">
        {posts.map((post) => (
          <div
            post-id={post._id}
            key={post._id}
            className="bg-amber-100 max-w-[800px] w-full mt-12 rounded-2xl flex flex-col p-4"
          >
            <div className="flex justify-end items-center">
              <h3 className="text-black text-start mr-4 font-bold hover:cursor-pointer">
                {post.username}
              </h3>
              <img src={post.profile} className="w-10 h-10 rounded-full" />
            </div>

            <div className="text-black ml-3 w-full text-start font-bold text-wrap flex flex-col">
              <h3 className="text-wrap ">{post.title}</h3>
              <hr className="my-2" />
              <h4>{post.body}</h4>
            </div>
            {post.image && post.image !== "" && (
              <div className="mt-5 p-2 max-w-full rounded-lg">
                <img
                  src={post.image}
                  className="w-full rounded-lg max-h-180 object-contain"
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
              <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white w-full app-comment min-h-[90%] max-w-[90%] flex p-5 rounded-lg shadow-lg flex-col items-center relative">
                  <button
                    className="absolute top-1 right-1 text-black px-3 py-1 rounded-md text-4xl"
                    onClick={() => SetActivePost(null)}
                  >
                    ×
                  </button>

                  <div className="w-full flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto p-4 pb-16">
                      <ShowComments postId={post._id} />
                    </div>
                    <div className="bg-gray-200 w-full flex items-center px-1 py-3 absolute bottom-0 left-0">
                      <input
                        type="text"
                        className="w-full outline-gray-700 border-2 border-gray-500 p-3 bg-transparent text-black rounded-lg flex-grow break-words whitespace-pre-wrap"
                        placeholder="Add Comment..."
                      />
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center gap-2">
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

export default MyProfile;
