import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState(null);

  async function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setProfile(file);
  }
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log("Success:", result);
    } catch (error) {
      console.log("Error:", error);
    }
    navigate("/")
  }

  return (
    <div>
      <div className="mt-[30px] flex flex-col items-center w-full">
        <label className="h-[90px] items-center flex  justify-center rounded-full w-[90px]  mb-4  bg-cyan-700">
          {preview && (
            <img src={preview} className="rounded-full w-full h-[100%]" />
          )}
          <input onChange={handleImageChange} type="file" hidden />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="64px"
            viewBox="0 -960 960 960"
            width="64px"
            fill="#e3e3e3"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </label>
        <div className="relative w-[80%] sm:w-[80%] lg:w-[80%] mb-4">
          <input
            type="text"
            required
            className="bg-[rgba(255,255,255,0.2)] w-full p-3 pr-10 rounded-md outline-none text-white placeholder-gray-300"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 0 24 24"
            width="20px"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            fill="#e3e3e3"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        <div className="relative w-[80%] sm:w-[80%] lg:w-[80%] mb-4">
          <input
            type="email"
            required
            className="bg-[rgba(255,255,255,0.2)] w-full p-3 pr-10 rounded-md outline-none text-white placeholder-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            fill="#e3e3e3"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
          </svg>
        </div>

        <div className="relative w-[80%] sm:w-[80%] lg:w-[80%]">
          <input
            type="password"
            required
            className="bg-[rgba(255,255,255,0.2)] w-full p-3 pr-10 rounded-md outline-none text-white placeholder-gray-300"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            fill="#e3e3e3"
          >
            <path d="M160-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-200v-80h800v80H80Zm400-240q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm320 0q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" />
          </svg>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="m-10 transition-all hover:bg-green-600 hover:cursor-pointer bg-green-500 w-[80%] sm:w-[80%] lg:w-[80%] p-2 rounded-xl font-bold text-xl"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
