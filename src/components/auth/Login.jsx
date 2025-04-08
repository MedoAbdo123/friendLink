import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      console.log("Response JSON:", json);

      if (response.ok) {
        localStorage.setItem("token", json.token);
        console.log("Token:", json.token);
        navigate("/");
      } else {
        console.error("Login failed", json.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="mt-[50px] flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="w-[80%] sm:w-[80%] lg:w-[80%]">
        <div className="relative mb-4">
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

        <div className="relative mb-4">
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
          className="m-10 bg-green-500 w-[80%] sm:w-[80%] lg:w-[80%] p-2 rounded-xl font-bold text-xl transition-all hover:bg-green-600 hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;