import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Task Management System
        </h1>
        <p className="text-gray-600 mb-8">
          Please select your login type to proceed:
        </p>
        <div className="space-y-4">
          <Link
            to="/admin-login"
            className="block w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Admin Login
          </Link>
          <Link
            to="/user-login"
            className="block w-full py-2 px-4 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;