import React, { useEffect, useState } from "react";

function ShowComments({ postId, refreshComments }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const url = `http://localhost:3000/comments/getComments/${postId}`;
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        if (json.comments && Array.isArray(json.comments)) {
          setComments(json.comments);
        } else {
          console.error("json.comments is not an array:", json.comments);
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId, refreshComments]);

  return (
    <div className="text-red-500">
      <div className="flex flex-col">
        {comments.length === 0 ? (
          <p>لا يوجد تعليقات</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex mb-4">
              <img
                src={comment.profile}
                className="w-10 h-10 rounded-full"
                alt="User"
              />
              <div className="flex w-full mt-2 ml-2">
                <div className="comment text-white w-full p-2 bg-blue-900 rounded-lg">
                  <h1 className="font-bold">{comment.username}</h1>
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShowComments;