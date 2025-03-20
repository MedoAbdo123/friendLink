import { jwtDecode } from "jwt-decode";
import React from "react";

function EditProfile() {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  return (
    <div>
     <div className="flex text-black justify-center w-full h-screen items-center ">
        <div className="flex flex-col w-full max-w-md min-w-[700px]:w-[200px] h-auto bg-white absolute rounded-lg p-5">
          <h1 className="font-bold text-start text-xl mt-3 ml-5">
            Edit Profile
          </h1>
          <p className="text-start ml-5">
            Make changes to your profile information.
          </p>
          <div className="flex justify-center relative">
            <img
              src={decode.profile}
              className="w-24 h-24 rounded-full mt-3 ml-3"
            />
            <label className="absolute p-1 rounded-full cursor-pointer">
              <input type="file" hidden />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                className="relative top-19 left-8 p-1 bg-gray-950 rounded-full"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
              </svg>
            </label>
          </div>
          <div className="text-start flex flex-col">
            <h1>Username</h1>
            <input
              type="text"
              className="w-[99%] rounded-[5px] border-1 border-gray-400 p-2 px-5 focus:outline-none focus:border-2 mb-5"
              placeholder="username"
            />
            <h1 className="text-xl">Bip</h1>
            <textarea
              className="bg-blue-100 h-[100%] rounded-lg outline-none border-1 border-gray-400 focus:border-2 focus:border-gray-400 p-4"
              placeholder="Describe yourself"
            ></textarea>
          </div>
          <div>
            <button className="font-black mt-5 bg-black text-white w-55 p-1 rounded-lg ">
              Save changes
            </button>
          </div>

          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="absolute top-3 right-2"
              fill="#000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
