import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // New state for gender
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate storing user data locally
    const userData = {
      name: fullName,
      email: email,
      password: password,
      gender: gender,
      userRole: "user",
    };

    // Check if email already exists in localStorage
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUser.find((user) => user.email === email)) {
      setError("Email is already registered");
      return;
    }

    // Save user data to localStorage
    existingUser.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUser));

    // Simulate a token
    const token = "fake-token"; 
    localStorage.setItem("token", token);
    localStorage.setItem("firstChar", fullName[0]);

    setSuccess(true);
    setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 2000); // Wait for 2 seconds before redirect
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 lg:w-3/5 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-2xl">
        {/* Left Section */}
        <div
          className="hidden lg:flex flex-1 flex-col justify-between p-8 bg-cover bg-center bg-opacity-50"
          style={{
            backgroundImage: `url('https://i.pinimg.com/originals/ed/ec/23/edec23fa42ab7abd1433d678463ca29f.jpg')`,
          }}
        >
          <div className="z-10">
            <h1 className="text-4xl font-bold text-white">Welcome!</h1>
            <p className="mt-5 text-lg text-white">
              Your journey to productivity starts here. Join us to unlock your
              potential and achieve your goals.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-5 animate-fadeInUp">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">Account created successfully!</p>
            )}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-red-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-red-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-red-400"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-red-400"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex items-center space-x-2 animate-fadeIn">
              <input
                type="checkbox"
                id="agree"
                required
                className="form-checkbox text-red-500"
              />
              <label htmlFor="agree" className="text-gray-600 text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-400 text-white py-3 rounded hover:bg-black transition-colors animate-fadeInUp"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center border border-gray-400 rounded py-3 cursor-pointer animate-fadeInUp">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google Icon"
                className="w-5 mr-2"
              />
              <span>Sign Up with Google</span>
            </div>
          </form>
          <div className="text-center mt-5 text-sm animate-fadeIn">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-gray-900">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
