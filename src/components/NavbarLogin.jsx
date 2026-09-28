
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogin = () => {
  return (
    <header className="app-navbar">
      <div className="app-container flex min-h-[68px] items-center justify-between">
        <Link to="/login" className="flex items-center gap-2">
          <span className="brand-mark">D</span>
          <span className="text-xl font-extrabold tracking-tight">
            Dev<span className="text-primary">Tinder</span>
          </span>
        </Link>

        <span className="hidden text-sm text-gray-500 sm:block">
          Connect with developers
        </span>

        <Link
          to="/login"
          className="app-button app-button-outline"
        >
          Log in
        </Link>
      </div>
    </header>
  );
};

export default NavbarLogin;