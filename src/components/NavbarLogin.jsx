import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NavbarLogin = () => {
  return (
    <header className="app-navbar">
      <div className="app-container flex min-h-17 items-center justify-between">
        <Link to="/login" className="flex items-center gap-2">
          <span className="brand-mark">D</span>

          <span className="text-xl font-extrabold tracking-tight">
            Dev<span className="text-primary">Tinder</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-base-content/60 sm:block">
            Connect with developers
          </span>

          <ThemeToggle />

          <Link
            to="/login"
            className="app-button app-button-outline"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavbarLogin;