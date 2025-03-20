import { jwtDecode } from "jwt-decode";
import React from "react";

function Profile() {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  return (
    <div>
      <div className="sm:flex sm:justify-center sm:items-center sm:space-x-3 mt-10 ml-5">
        <img
          src={decode.profile}
          className="sm:w-30 border-4 w-20 rounded-full xl:w-30 2xl:w-35"
        />
        <h1 className="text-2xl text-start font-bold mt-3 ">
          {decode.username}
        </h1>
        <br />
        <button className="border-1 w-42 p-1 flex px-11 mt-[-20px] sm:px-6 sm:mt-2 sm:w-33 transition-all hover:bg-gray-500 rounded-lg">
          Edit Profile
        </button>
      </div>
      <div className="flex items-center bg-white w-100 ">
        <div></div>
      </div>
    </div>
  );
}

export default Profile;
