import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({
  quoteTitle = "A Wise Quote",
  quoteSubtitle = "Get Everything You Want",
  quoteText = "You can get everything you want if you work hard, trust the process, and stick to the plan.",
  welcomeText = "Welcome Back",
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  rememberMeText = "Remember me",
  forgotPasswordText = "Forgot Password?",
  submitButtonText = "Sign In",
  googleSignInText = "Sign in with Google",
  googleIconUrl = "https://img.icons8.com/color/48/000000/google-logo.png",
  signUpPromptText = "Don't have an account?",
  signUpLinkText = "Sign Up",
  signUpLinkHref = "/signup"
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate successful login
    const dummyEmail = 'user@example.com'; // Simulate a valid email
    const dummyPassword = 'password123'; // Simulate a valid password

    if (email === dummyEmail && password === dummyPassword) {
      // Simulate token generation
      const token = 'dummyToken123';
      const firstChar = email.charAt(0).toUpperCase(); // First character of email as name

      // Save token and firstChar in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('firstChar', firstChar);

      // Redirect to home page
      navigate('/');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 lg:w-3/5 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-2xl">
        {/* Left Section */}
        <div
          className="hidden lg:flex flex-1 flex-col justify-between p-8 bg-cover bg-center bg-opacity-50"
          style={{ backgroundImage: `url('https://i.pinimg.com/originals/ed/ec/23/edec23fa42ab7abd1433d678463ca29f.jpg')` }}
        >
          <div className="z-10">
            <h1 className="text-4xl font-bold text-white">{quoteTitle}</h1>
            <p className="mt-5 text-lg text-white">{quoteSubtitle}</p>
            <p className="text-white mt-2">{quoteText}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-5 animate-fadeInUp">{welcomeText}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-red-400"
            />
            <input
              type="password"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-red-400"
            />
            <div className="flex items-center justify-between animate-fadeIn">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-red-500" />
                <span className="text-gray-600 text-sm">{rememberMeText}</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                {forgotPasswordText}
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-400 text-white py-3 rounded hover:bg-black transition-colors animate-fadeInUp"
            >
              {submitButtonText}
            </button>
            <div className="flex items-center justify-center border border-gray-400 rounded py-3 cursor-pointer animate-fadeInUp">
              <img
                src={googleIconUrl}
                alt="Google Icon"
                className="w-5 mr-2"
              />
              <span>{googleSignInText}</span>
            </div>
          </form>
          <div className="text-center mt-5 text-sm animate-fadeIn">
            {signUpPromptText}{" "}
            <Link to={signUpLinkHref} className="font-bold text-gray-900">
              {signUpLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
