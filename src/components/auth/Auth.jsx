import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Auth() {
  const location = useLocation();
  
  return (
    <div className="flex select-none items-center justify-center h-screen">
      <div className="flex bg-gray-600 max-w-[90%] md:max-w-[60%] min-h-auto w-full rounded-xl flex-col p-5">
        <div className="relative flex justify-center w-full mt-5">
          <Link to="/auth/login">
            <h1
              className={`select-none text-center font-bold text-2xl border-b-4 px-4 transition-all ${
                location.pathname === "/auth/login"
                  ? "border-blue-700"
                  : "border-white"
              }`}
            >
              Login
            </h1>
          </Link>

          <Link to="/auth/register">
            <h1
              className={`select-none text-center font-bold text-2xl border-b-4 px-4 transition-all ${
                location.pathname === "/auth/register"
                  ? "border-blue-700"
                  : "border-white"
              }`}
            >
              register
            </h1>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
