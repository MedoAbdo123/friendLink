import React, { useEffect, useState } from "react";
import ShowComments from "../comments/ShowComments";
import { LuSend } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { RiUserUnfollowFill, RiUserAddFill } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";

function UserProfile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const { userId } = useParams();
  const [hasFriendRequest, setHasFriendRequest] = useState(false);
  const token = localStorage.getItem("token")
  const [friend, setFriend] = useState(() => {
    return JSON.parse(localStorage.getItem(`friendStatus_${userId}`)) || false;
  });
  useEffect(() => {
    async function getMyPosts() {
      const response = await fetch(`http://localhost:3000/posts/getPosts/${userId}`, {
        method: "GET",
      });
      const json = await response.json();
      setPosts(json.posts);
      setUser(json.user);
    }
    getMyPosts();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`friendStatus_${userId}`, JSON.stringify(friend));
  }, [friend, userId]);

  async function sendRequest() {
    const request = await fetch(`http://localhost:3000/friends/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        receiverId: userId
      })
    });
    return request;
  }

  async function declineRequets() {
    const request = await fetch(`http://localhost:3000/friends/cancel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        receiverId: userId
      })
    });
    return request;
  }

  useEffect(() => {
    async function checkFriendRequest() {
      const request = await fetch(`http://localhost:3000/friends/check/${userId}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await request.json();
      setHasFriendRequest(data.hasRequest);
    }
    checkFriendRequest();
  }, [userId]);
  return (
    <div className="container mx-auto max-w-3xl h-screen mt-10 p-4">
      <div className="flex items-center space-x-4">
        <img
          src={user.profile || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4"
        />
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">{user.username}</h1>
          </div>
          {hasFriendRequest ?
            (
              <div>
                <div className="flex space-x-4 flex-wrap space-y-2 sm:space-y-0">
                  <button
                    className='bg-green-600 shadow-sm shadow-[rgba(0,0,0,0.42)] hover:shadow-black transition-all hover:bg-green-700 flex items-center space-x-2 w-30 sm:w-40 justify-center p-1.5 rounded hover:cursor-pointer'                >
                    <FiUserCheck />
                    <p>Accept</p>
                  </button>
                  <button
                    className='bg-red-600 shadow-sm shadow-[rgba(0,0,0,0.42)] hover:shadow-black transition-all hover:bg-red-700 flex items-center space-x-2 w-30 sm:w-40 justify-center p-1.5 rounded hover:cursor-pointer h-9'
                  >
                    <FiUserMinus />
                    <p>Decline</p>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={async () => {
                  if (friend) {
                    await declineRequets();
                  } else {
                    await sendRequest();
                  }
                  setFriend(!friend);
                }}
                className={`border px-4 py-1 flex items-center rounded-lg text-sm transition-all max-w-32
                ${friend ? "border-red-500 hover:bg-red-500" : "border-green-400 hover:bg-green-500"}`}
              >
                {friend ? <p>UnFriend</p> : <p>Add Friend</p>}
                <span className="ml-2">
                  {friend ? <RiUserUnfollowFill className="text-lg" /> : <RiUserAddFill className="text-lg" />}
                </span>
              </button>
            )
          }
        </div>
      </div>

      <p className="mt-4 text-start text-gray-100">
        <span className="block">posts: {posts.length}</span>
        Digital creator | Photography enthusiast | Travel lover
      </p>
      <div className="p-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-amber-100 max-w-[800px] w-full mt-12 rounded-2xl flex flex-col p-4">
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
            {post.image && <img
              src={post.image}
              className="w-full rounded-lg"
              alt="Post"
              onError={(e) => (e.target.style.display = "none")}
            />}

            <div className="flex justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="hover:cursor-pointer mt-5 m-2"
                onClick={() => setActivePost(activePost === post._id ? null : post._id)}
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
                    onClick={() => setActivePost(null)}
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

export default UserProfile;