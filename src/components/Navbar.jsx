import React, { useEffect, useState } from "react";

function ShowComments({ postId }) {
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
        console.log("Fetched comments:", json);

        // تأكد أن json.comments موجود وهو مصفوفة
        if (json.comments && Array.isArray(json.comments)) {
          setComments(json.comments);
        } else {
          console.error(
            "Expected json.comments to be an array but got:",
            json.comments
          );
          setComments([]); // في حالة عدم وجود تعليقات
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // في حالة الخطأ
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return (
    <div className="text-white p-4">
      {comments.length === 0 ? (
        <p className="text-center text-gray-400">لا توجد تعليقات بعد.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-start mb-6">
            <img
              src={
                comment.profile ||
                "http://localhost:3000/uploads/default-profile.png"
              }
              className="w-12 h-12 rounded-full"
              alt="Profile"
            />
            <div className="bg-gray-800 ml-3 p-3 rounded-lg max-w-[75%]">
              <h1 className="font-bold text-blue-400">{comment.username}</h1>
              <p className="text-gray-300 break-words">
                {comment.title}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowComments;
