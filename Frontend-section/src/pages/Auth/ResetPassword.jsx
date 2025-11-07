import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import logo from "@/assets/logo.jpg";
import toast from "react-hot-toast";
import api from "@/services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [error, setError] = useState("");

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await api.get(`/users/reset-password/${token}`);
        if (response.data.data?.valid) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          setError("Invalid or expired reset token");
        }
      } catch (error) {
        setIsTokenValid(false);
        setError(
          error.response?.data?.message || "Invalid or expired reset token"
        );
      } finally {
        setIsValidating(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setIsValidating(false);
      setIsTokenValid(false);
      setError("No reset token provided");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(`/users/reset-password/${token}`, {
        password,
      });

      toast.success(response.data.message || "Password reset successfully!");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to reset password. Please try again."
      );
      toast.error(
        error.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while validating token
  if (isValidating) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white shadow-lg rounded-xl min-h-[700px]">
          <div className="w-full max-w-md text-center">
            <div className="relative inline-block mb-8">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full shadow-lg ring-4 ring-blue-200"
              />
              <div className="absolute -top-2 -right-2 animate-pulse">
                <FaBookOpen size={20} className="text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-blue-800 mb-4">
              Validating Reset Link
            </h2>
            <div className="flex justify-center mb-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Library Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-300/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
            <h1 className="text-6xl font-extrabold mb-6 animate-slide-in-left text-white drop-shadow-lg">
              Reset Password
            </h1>
            <p className="text-2xl animate-slide-in-right text-white max-w-lg text-center drop-shadow-md">
              Secure your account with a new password.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white shadow-lg rounded-xl min-h-[700px]">
          <div className="w-full max-w-md text-center">
            <div className="relative inline-block mb-8">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full shadow-lg ring-4 ring-red-200"
              />
              <div className="absolute -top-2 -right-2 animate-pulse">
                <MdLock size={20} className="text-red-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-red-800 mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-8">
              {error || "This reset link is invalid or has expired. Please request a new one."}
            </p>
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Library Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-300/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
            <h1 className="text-6xl font-extrabold mb-6 animate-slide-in-left text-white drop-shadow-lg">
              Invalid Link
            </h1>
            <p className="text-2xl animate-slide-in-right text-white max-w-lg text-center drop-shadow-md">
              This link has expired or is invalid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Valid token - show reset form
  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white shadow-lg rounded-xl min-h-[700px]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full shadow-lg ring-4 ring-blue-200"
              />
              <div className="absolute -top-2 -right-2 animate-pulse">
                <FaBookOpen size={20} className="text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-blue-800 mb-2">
              Reset Password
            </h2>
            <p className="text-blue-600 text-lg">
              Enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="group relative">
              <label className="absolute left-10 top-3 text-gray-600 font-medium transition-all duration-300 pointer-events-none text-xs -top-2 text-blue-600 bg-white px-1">
                New Password
              </label>
              <div className="relative transform transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <MdLock size={20} />
                </span>
                <input
                  className="border text-black border-gray-300 rounded-xl px-4 py-4 w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-xl bg-white/80 backdrop-blur-sm"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder=""
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
            </div>

            <div className="group relative">
              <label className="absolute left-10 top-3 text-gray-600 font-medium transition-all duration-300 pointer-events-none text-xs -top-2 text-blue-600 bg-white px-1">
                Confirm Password
              </label>
              <div className="relative transform transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <MdLock size={20} />
                </span>
                <input
                  className="border text-black border-gray-300 rounded-xl px-4 py-4 w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-xl bg-white/80 backdrop-blur-sm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder=""
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50/80 backdrop-blur-sm p-4 rounded-xl border border-red-200 animate-fade-in-up shadow-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Resetting Password...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <MdLock size={18} />
                  Reset Password
                </div>
              )}
            </Button>

            <p className="text-center text-gray-700 mt-6">
              Remember your password?{" "}
              <Link
                to="/"
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
              >
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Library Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-300/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
          <h1 className="text-6xl font-extrabold mb-6 animate-slide-in-left text-white drop-shadow-lg">
            Reset Password
          </h1>
          <p className="text-2xl animate-slide-in-right text-white max-w-lg text-center drop-shadow-md">
            Secure your account with a new password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

