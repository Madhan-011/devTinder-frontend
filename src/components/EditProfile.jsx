import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/subStore/userSlice";
import UserCard from "./UserCard";
import { validateProfile } from "../utils/validation";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(
    user.firstName || "",
  );

  const [lastName, setLastName] = useState(
    user.lastName || "",
  );

  const [photoUrl, setPhotoUrl] = useState(
    user.photoUrl || "",
  );

  const [gender, setGender] = useState(
    user.gender || "",
  );

  const [age, setAge] = useState(
    user.age || "",
  );

  const [about, setAbout] = useState(
    user.about || "",
  );

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    age: "",
    gender: "",
    about: "",
  });

  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  const clearFieldError = (field) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));

    setError("");
  };

  const getErrorMessage = (err) => {
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

    return "Unable to save profile.";
  };

  const saveProfile = async () => {
    if (isSaving) return;

    setError("");

    const validationErrors = validateProfile({
      firstName,
      lastName,
      photoUrl,
      age,
      gender,
      about,
    });

    setErrors({
      firstName: validationErrors.firstName || "",
      lastName: validationErrors.lastName || "",
      photoUrl: validationErrors.photoUrl || "",
      age: validationErrors.age || "",
      gender: validationErrors.gender || "",
      about: validationErrors.about || "",
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      const profileData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        photoUrl: photoUrl.trim(),
        age:
          age === "" || age === null
            ? age
            : Number(age),
        gender,
        about: about.trim(),
      };

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        profileData,
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));

      setErrors({
        firstName: "",
        lastName: "",
        photoUrl: "",
        age: "",
        gender: "",
        about: "",
      });

      setError("");

      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="app-container page-section">
        <div className="mb-8">
          <span className="app-tag">
            Your account
          </span>

          <h1 className="app-heading mt-3">
            Edit your profile
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            Keep your developer profile up to date.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <section className="app-panel p-5 sm:p-7">
            <h2 className="text-lg font-bold">
              Profile details
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              Update the information other developers see.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  placeholder="First name"
                  minLength={4}
                  maxLength={50}
                  required
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
                  placeholder="Last name"
                  maxLength={50}
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
            </div>

            <div className="mt-4">
              <label
                htmlFor="photoUrl"
                className="mb-1.5 block text-sm font-semibold"
              >
                Profile photo URL
              </label>

              <input
                id="photoUrl"
                type="url"
                value={photoUrl}
                className={`app-input ${
                  errors.photoUrl
                    ? "app-input-error"
                    : ""
                }`}
                placeholder="https://example.com/photo.jpg"
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  clearFieldError("photoUrl");
                }}
              />

              {errors.photoUrl && (
                <p
                  className="field-error"
                  role="alert"
                >
                  {errors.photoUrl}
                </p>
              )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="age"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Age
                </label>

                <input
                  id="age"
                  type="number"
                  value={age}
                  min={18}
                  max={100}
                  step={1}
                  className={`app-input ${
                    errors.age
                      ? "app-input-error"
                      : ""
                  }`}
                  placeholder="Age"
                  onChange={(e) => {
                    setAge(e.target.value);
                    clearFieldError("age");
                  }}
                />

                {errors.age && (
                  <p
                    className="field-error"
                    role="alert"
                  >
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  value={gender}
                  className={`app-input ${
                    errors.gender
                      ? "app-input-error"
                      : ""
                  }`}
                  onChange={(e) => {
                    setGender(e.target.value);
                    clearFieldError("gender");
                  }}
                >
                  <option value="">
                    Select gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="others">
                    Others
                  </option>
                </select>

                {errors.gender && (
                  <p
                    className="field-error"
                    role="alert"
                  >
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="about"
                  className="block text-sm font-semibold"
                >
                  About
                </label>

                <span className="text-xs text-base-content/50">
                  {about.length}/1000
                </span>
              </div>

              <textarea
                id="about"
                value={about}
                maxLength={1000}
                className={`app-input min-h-32 resize-y ${
                  errors.about
                    ? "app-input-error"
                    : ""
                }`}
                placeholder="Tell other developers about yourself..."
                onChange={(e) => {
                  setAbout(e.target.value);
                  clearFieldError("about");
                }}
              />

              {errors.about && (
                <p
                  className="field-error"
                  role="alert"
                >
                  {errors.about}
                </p>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="alert alert-error mt-4"
              >
                <span>{error}</span>
              </div>
            )}

            <button
              type="button"
              className="app-button app-button-primary mt-6 w-full"
              onClick={saveProfile}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span
                    className="loading loading-spinner loading-sm"
                    aria-hidden="true"
                  />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </section>

          <aside className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-lg font-bold">
              Live preview
            </h2>

            <p className="mb-4 text-sm text-base-content/60">
              This is how your profile card will appear.
            </p>

            <UserCard
              user={{
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              }}
              showActions={false}
            />
          </aside>
        </div>
      </section>

      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>
              Profile saved successfully!
            </span>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditProfile;