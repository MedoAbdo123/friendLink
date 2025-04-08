import { jwtDecode } from 'jwt-decode'
import { FiUserCheck } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { FiUserMinus } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import React, { useEffect, useState } from 'react'

function FriendRequests() {
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  const [friends, setFriends] = useState([])
  const [acceptedNow, setAcceptedNow] = useState([]);
  const [persistedAccepted, setPersistedAccepted] = useState(() => {
    return JSON.parse(localStorage.getItem("acceptedFriends")) || [];
  });
  const [declinedRequests, setDeclinedRequests] = useState(() => {
    return JSON.parse(localStorage.getItem("declinedRequests")) || [];
  });
  useEffect(() => {
    async function getAllFriendRequests() {
      try {
        const response = await fetch(`http://localhost:3000/friends/${decode.id}`, {
          method: "GET",
        });
        const json = await response.json();
        const filtered = json.filter(friend => !persistedAccepted.includes(friend._id));
        setFriends(filtered);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    }
    getAllFriendRequests();
  }, [decode.id, persistedAccepted]);

  async function AcceptFriend(friendId) {
    try {
      const response = await fetch(`http://localhost:3000/friends/accept/${friendId}`, {
        method: "POST",
      });

      if (response.ok) {
        console.log(`✅ Accepted Friend ID: ${friendId}`);
        setAcceptedNow(prev => [...prev, friendId]);

        setTimeout(() => {
          setFriends(prev => prev.filter(friend => friend._id !== friendId));
          setPersistedAccepted(prev => {
            const updated = [...prev, friendId];
            localStorage.setItem("acceptedFriends", JSON.stringify(updated));
            return updated;
          });
          setAcceptedNow(prev => prev.filter(id => id !== friendId));
        }, 2000);
      } else {
        console.error("❌ Failed to accept friend request");
      }
    } catch (error) {
      console.error("❌ Error accepting friend request:", error);
    }
  }

  async function DeclineFriend(friendId) {
    try {
      const response = await fetch(`http://localhost:3000/friends/decline/${friendId}`, {
        method: "POST",
      });

      if (response.ok) {
        console.log(`❌ Declined Friend ID: ${friendId}`);

        setDeclinedRequests(prev => {
          const updated = [...prev, friendId];
          localStorage.setItem("declinedRequests", JSON.stringify(updated));
          return updated;
        });

        setFriends(prev => prev.filter(friend => friend._id !== friendId));
      } else {
        console.error("❌ Failed to decline friend request");
      }
    } catch (error) {
      console.error("❌ Error declining friend request:", error);
    }
  }
  return (
    <div className='flex justify-center'>
      <div className='bg-[rgba(255,255,255)] w-[100%] flex-col flex items-center sm:w-[80%] min-h-screen pb-4'>
        <h1 className='text-black mt-14 mb-0 text-3xl font-bold'>Friend Requests</h1>
        {friends.map(friend => (
          <div key={friend._id}>
            <div
              className={`w-[310px] sm:w-[458px] h-[186px] mt-10 rounded-lg image border-[rgba(0,0,0,0.72)]
              ${acceptedNow.includes(friend._id) ? "bg-green-200" : "bg-white"}`}
            >
              <div className='flex justify-end w-110 mt-4 absolute right-3 sm:top-4 top-3.5'>
                <div className={`w-23 rounded-2xl h-auto flex items-center
                ${acceptedNow.includes(friend._id) ? "" : "bg-[rgb(0,0,0)]"}`}>
                  {acceptedNow.includes(friend._id) ? (
                    <div className='w-auto rounded-2xl border-1 border-green-500 h-auto flex items-center'>
                      <BiCheck className='text-green-700 text-md ml-1' />
                      <p className='text-green-700 mx-1.5'>Accepted</p>
                    </div>
                  ) : (
                    <>
                      <LuClock3 className='text-white text-md ml-1' />
                      <p className='font-bold mx-1.5'>Pending</p>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-4">
                <div className="h-16 w-16 ml-7 mt-12 border-4 border-gray-200 rounded-full shadow-md overflow-hidden">
                  <img src={friend.profile} className="h-14 w-14 border-4 rounded-full" />
                </div>
                <div className="grid gap-0.5 text-black mt-13.5">
                  <h3 className="text-xl font-bold text-start relative">{friend.username}</h3>
                  <p className="text-sm text-gray-500">Wants to connect with you</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                {!acceptedNow.includes(friend._id) ? (
                  <>
                    <button
                      className='bg-green-600 shadow-sm shadow-[rgba(0,0,0,0.42)] hover:shadow-black transition-all hover:bg-green-700 flex items-center space-x-2 w-30 sm:w-40 justify-center p-1.5 rounded hover:cursor-pointer'
                      onClick={() => AcceptFriend(friend._id)}
                    >
                      <FiUserCheck />
                      <p>Accept</p>
                    </button>
                    <button onClick={() => DeclineFriend(friend._id)} className='bg-red-600 shadow-sm shadow-[rgba(0,0,0,0.42)] hover:shadow-black transition-all hover:bg-red-700 flex items-center space-x-2 w-30 sm:w-40 justify-center p-1.5 rounded hover:cursor-pointer'>
                      <FiUserMinus />
                      <p>Decline</p>
                    </button>
                  </>
                ) : (
                  <button className='border-green-400 border-1 hover:shadow-black transition-all hover:bg-[rgba(255,255,255,0.33)] flex items-center space-x-2 w-[80%] justify-center p-1.5 rounded hover:cursor-pointer'>
                    <FiUserCheck className='text-green-700' />
                    <p className='text-green-700'>Friend</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendRequests