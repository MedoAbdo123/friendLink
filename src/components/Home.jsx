import { useEffect, useState } from "react";
import ShowComments from "./comments/ShowComments";

function Home() {
    const [posts, setPosts] = useState([]);
    const [activePost, SetActivePost] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/posts/getPosts', { method: "GET" });

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
    return (
        <div className="text-start">
            <h1 className="text-start text-4xl font-bold">FriendLink</h1>
            <div className="flex justify-center items-center flex-col">
                {posts.map((post) => (
                    <div post-id={post._id} key={post._id} className="bg-amber-100 w-[80%] mt-12 rounded-2xl flex flex-col p-4">
                        <div className="flex justify-end items-center">
                            <h3 className="text-black text-start mr-4 font-bold hover:cursor-pointer">{post.username}</h3>
                            <img src={post.profile} className="w-10 h-10 rounded-full" />
                        </div>

                        <div className="text-black ml-3 w-full text-wrap flex flex-col">
                            <h3 className="text-wrap ">{post.title}</h3>
                            <hr className="my-2" />
                            <h4>{post.body}</h4>
                        </div>

                        {post.image && (
                            <img src={post.image} className="mt-5 p-2 max-w-full rounded-lg" alt="Post" />
                        )}

                        <div className="flex justify-center text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="hover:cursor-pointer mt-5 m-2" onClick={() => SetActivePost(activePost == post._id ? null : post._id)}  >
                                <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                            </svg>
                            <span className="mt-5">{post.__v}</span>
                        </div>
                        {activePost === post._id && (
                            <div className="fixed inset-0 flex justify-center items-center">
                                <div className="bg-white w-full app-comment min-h-[90%] max-w-[90%] flex p-5 rounded-lg shadow-lg relative">
                                    <button
                                        onClick={() => SetActivePost(null)}
                                        className="absolute top-2 right-2 text-xl"
                                    >
                                        ✖
                                    </button>
                                    <div className="mt-10"   >
                                        <ShowComments postId={post._id} className="-n"/>
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