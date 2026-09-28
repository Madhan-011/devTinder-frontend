
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/subStore/userSlice";
import { clearFeed } from "../store/subStore/feedSlice";
import {
  clearRequests,
  removeConnections,
} from "../store/subStore/connectionSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(removeConnections());
      dispatch(clearRequests());
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header className="app-navbar">
      <div className="app-container flex min-h-[68px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="brand-mark">D</span>
          <span className="text-xl font-extrabold tracking-tight">
            Dev<span className="text-primary">Tinder</span>
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-600 sm:block">
              Welcome, {user.firstName}
            </span>

            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-label="Open account menu"
              >
                <div className="w-10 rounded-full border border-gray-200">
                  <img
                    src={user.photoUrl}
                    alt="Your profile"
                  />
                </div>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-56 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li className="menu-title">
                  <span>My account</span>
                </li>
                <li>
                  <Link to="/profile">Edit profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;