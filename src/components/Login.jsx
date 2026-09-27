import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/subStore/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

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
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(data.data)
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
    <div className="flex justify-center mt-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-8">
        <legend className="fieldset-legend text-2xl">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label text-base">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input input-lg w-full"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label text-base">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input input-lg w-full"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label text-base">Email</label>
        <input
          type="email"
          value={email}
          className="input input-lg w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-base mt-3">Password</label>
        <input
          type="password"
          value={password}
          className="input input-lg w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500 pt-4 pl-2 font-md text-lg">{error}</p>

        <button
          className="btn btn-neutral btn-lg w-full mt-6"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="m-auto cursor-pointer py-2"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
