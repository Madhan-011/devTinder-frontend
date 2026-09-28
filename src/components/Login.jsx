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

  const validateForm = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email address is required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setError("Password is required.");
      return false;
    }

    if (isLoginForm) {
      setError("");
      return true;
    }

    if (!trimmedFirstName) {
      setError("First name is required.");
      return false;
    }

    if (trimmedFirstName.length < 4) {
      setError("First name must be at least 4 characters.");
      return false;
    }

    if (trimmedFirstName.length > 50) {
      setError("First name cannot exceed 50 characters.");
      return false;
    }

    if (!trimmedLastName) {
      setError("Last name is required.");
      return false;
    }

    if (trimmedLastName.length > 50) {
      setError("Last name cannot exceed 50 characters.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError(
        "Password must contain at least one uppercase letter.",
      );
      return false;
    }

    if (!/[a-z]/.test(password)) {
      setError(
        "Password must contain at least one lowercase letter.",
      );
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError(
        "Password must contain at least one special character.",
      );
      return false;
    }

    setError("");
    return true;
  };

  const getErrorMessage = (err, fallbackMessage) => {
    const responseData = err?.response?.data;

    if (typeof responseData === "string") {
      return responseData;
    }

    if (responseData?.message) {
      return responseData.message;
    }

    return fallbackMessage;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          email: email.trim(),
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(data.data));
      navigate("/");
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to log in. Please check your credentials.",
        ),
      );
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to create your account. Please try again.",
        ),
      );
    }
  };

  const switchToLogin = () => {
    setIsLoginForm(true);
    setError("");
  };

  const switchToSignUp = () => {
    setIsLoginForm(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="app-shell">
      <NavbarLogin />

      <main className="app-container flex min-h-[calc(100vh-68px)] items-center justify-center py-12">
        <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm md:grid-cols-2">
          <section className="flex flex-col justify-between bg-base-200 p-8 md:p-10">
            <div>
              <span className="app-tag">
                Developer community
              </span>

              <h1 className="mt-8 max-w-sm text-4xl font-extrabold leading-tight tracking-tight text-base-content">
                Meet people who
                <span className="block text-primary">
                  build like you.
                </span>
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-7 text-base-content/65">
                Discover developers, share ideas and find
                people to build something meaningful with.
              </p>
            </div>

            <div className="mt-12 border-t border-base-300 pt-5">
              <p className="text-sm font-semibold text-base-content/85">
                Build together. Grow together.
              </p>

              <p className="mt-1 text-xs text-base-content/60">
                A space for developers to connect.
              </p>
            </div>
          </section>

          <section className="p-7 sm:p-10">
            <div className="mb-8 flex gap-6 border-b border-base-300">
              <button
                type="button"
                className={`border-b-2 pb-3 text-sm font-bold ${
                  isLoginForm
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/45"
                }`}
                onClick={switchToLogin}
              >
                Log in
              </button>

              <button
                type="button"
                className={`border-b-2 pb-3 text-sm font-bold ${
                  !isLoginForm
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/45"
                }`}
                onClick={switchToSignUp}
              >
                Sign up
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-base-content">
              {isLoginForm
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p className="mt-2 text-sm text-base-content/60">
              {isLoginForm
                ? "Enter your details to continue."
                : "Join the developer community today."}
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              {!isLoginForm && (
                <>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-sm font-semibold"
                    >
                      First name
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      className="app-input"
                      placeholder="Your first name"
                      minLength={4}
                      maxLength={50}
                      autoComplete="given-name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setError("");
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-sm font-semibold"
                    >
                      Last name
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      className="app-input"
                      placeholder="Your last name"
                      maxLength={50}
                      autoComplete="family-name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setError("");
                      }}
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  className="app-input"
                  placeholder="name@example.com"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  className="app-input"
                  placeholder="Enter your password"
                  minLength={isLoginForm ? undefined : 8}
                  autoComplete={
                    isLoginForm
                      ? "current-password"
                      : "new-password"
                  }
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

                {!isLoginForm && (
                  <p className="password-hint">
                    Use 8+ characters with uppercase, lowercase,
                    number and special character.
                  </p>
                )}
              </div>

              {error && (
                <p role="alert" className="form-error">
                  {typeof error === "string"
                    ? error
                    : error?.message || "Something went wrong"}
                </p>
              )}

              <button
                type="submit"
                className="app-button app-button-primary mt-6 w-full"
              >
                {isLoginForm
                  ? "Log in"
                  : "Create account"}

                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-base-content/60">
              Connect with developers and grow your network.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;