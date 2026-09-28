import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/subStore/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import NavbarLogin from "./NavbarLogin";
import {
  validateLogin,
  validateSignup,
} from "../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearFieldError = (field) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
      general: "",
    }));
  };

  const clearErrors = () => {
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      general: "",
    });
  };

  const getErrorMessage = (err, fallbackMessage) => {
    const responseData = err?.response?.data;

    if (typeof responseData === "string") {
      return responseData;
    }

    if (responseData?.message) {
      return responseData.message;
    }

    if (responseData?.error) {
      return responseData.error;
    }

    return fallbackMessage;
  };

  const validateForm = () => {
    const validationErrors = isLoginForm
      ? validateLogin(email, password)
      : validateSignup(
          firstName,
          lastName,
          email,
          password,
        );

    setErrors({
      firstName: validationErrors.firstName || "",
      lastName: validationErrors.lastName || "",
      email: validationErrors.email || "",
      password: validationErrors.password || "",
      general: "",
    });

    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    if (isSubmitting) return;

    const isValid = validateForm();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          email: email.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(data.data));
      navigate("/");
    } catch (err) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        general: getErrorMessage(
          err,
          "Unable to log in. Please check your credentials.",
        ),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async () => {
    if (isSubmitting) return;

    const isValid = validateForm();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        general: getErrorMessage(
          err,
          "Unable to create your account. Please try again.",
        ),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToLogin = () => {
    setIsLoginForm(true);
    clearErrors();
  };

  const switchToSignUp = () => {
    setIsLoginForm(false);
    clearErrors();
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
                      className={`app-input ${
                        errors.firstName
                          ? "app-input-error"
                          : ""
                      }`}
                      placeholder="Your first name"
                      minLength={4}
                      maxLength={50}
                      required
                      autoComplete="given-name"
                      aria-invalid={Boolean(
                        errors.firstName,
                      )}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearFieldError("firstName");
                      }}
                    />

                    {errors.firstName && (
                      <p
                        className="field-error"
                        role="alert"
                      >
                        {errors.firstName}
                      </p>
                    )}
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
                      className={`app-input ${
                        errors.lastName
                          ? "app-input-error"
                          : ""
                      }`}
                      placeholder="Your last name"
                      maxLength={50}
                      required
                      autoComplete="family-name"
                      aria-invalid={Boolean(
                        errors.lastName,
                      )}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearFieldError("lastName");
                      }}
                    />

                    {errors.lastName && (
                      <p
                        className="field-error"
                        role="alert"
                      >
                        {errors.lastName}
                      </p>
                    )}
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
                  className={`app-input ${
                    errors.email
                      ? "app-input-error"
                      : ""
                  }`}
                  placeholder="name@example.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                />

                {errors.email && (
                  <p
                    className="field-error"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
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
                  className={`app-input ${
                    errors.password
                      ? "app-input-error"
                      : ""
                  }`}
                  placeholder="Enter your password"
                  minLength={
                    isLoginForm ? undefined : 8
                  }
                  required
                  autoComplete={
                    isLoginForm
                      ? "current-password"
                      : "new-password"
                  }
                  aria-invalid={Boolean(errors.password)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                />

                {!isLoginForm && (
                  <p className="password-hint">
                    Use 8+ characters with uppercase,
                    lowercase, number and special character.
                  </p>
                )}

                {errors.password && (
                  <p
                    className="field-error"
                    role="alert"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.general && (
                <div
                  className="form-error"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                className="app-button app-button-primary mt-6 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="loading loading-spinner loading-sm"
                      aria-hidden="true"
                    />

                    {isLoginForm
                      ? "Logging in..."
                      : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLoginForm
                      ? "Log in"
                      : "Create account"}

                    <span aria-hidden="true">
                      →
                    </span>
                  </>
                )}
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