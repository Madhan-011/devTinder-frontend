
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/subStore/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import NavbarLogin from "./NavbarLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true },
      );
      console.log(data.data);
      dispatch(addUser(data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="app-shell">
      <NavbarLogin />

      <main className="app-container flex min-h-[calc(100vh-68px)] items-center justify-center py-12">
        <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-base-300 bg-white shadow-sm md:grid-cols-2">
          <section className="flex flex-col justify-between bg-[#edf3f3] p-8 md:p-10">
            <div>
              <span className="app-tag">Developer community</span>
              <h1 className="mt-8 max-w-sm text-4xl font-extrabold leading-tight tracking-tight text-[#27343b]">
                Meet people who
                <span className="block text-primary">
                  build like you.
                </span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">
                Discover developers, share ideas and find
                people to build something meaningful with.
              </p>
            </div>

            <div className="mt-12 border-t border-[#d5e0df] pt-5">
              <p className="text-sm font-semibold text-[#34434a]">
                Build together. Grow together.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                A space for developers to connect.
              </p>
            </div>
          </section>

          <section className="p-7 sm:p-10">
            <div className="mb-8 flex gap-6 border-b border-gray-200">
              <button
                className={`border-b-2 pb-3 text-sm font-bold ${
                  isLoginForm
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => {
                  setIsLoginForm(true);
                  setError("");
                }}
              >
                Log in
              </button>
              <button
                className={`border-b-2 pb-3 text-sm font-bold ${
                  !isLoginForm
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => {
                  setIsLoginForm(false);
                  setError("");
                }}
              >
                Sign up
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-800">
              {isLoginForm ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {isLoginForm
                ? "Enter your details to continue."
                : "Join the developer community today."}
            </p>

            <div className="mt-6 space-y-4">
              {!isLoginForm && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      className="app-input"
                      placeholder="Your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      className="app-input"
                      placeholder="Your last name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  className="app-input"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="app-input"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-error">
                {typeof error === "string"
                  ? error
                  : error.message || "Something went wrong"}
              </p>
            )}

            <button
              className="app-button app-button-primary mt-6 w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Log in" : "Create account"}
              <span aria-hidden="true">→</span>
            </button>

            <p className="mt-6 text-center text-xs text-gray-500">
              Connect with developers and grow your network.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;