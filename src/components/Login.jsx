import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/subStore/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("madhan@gmail.com");
  const [password, setPassword] = useState("Madhan#123");
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
    }
  };

  return (
    <div className="flex justify-center mt-28">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-8">
        <legend className="fieldset-legend text-2xl">Login</legend>

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
          onClick={handleClick}
        >
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
