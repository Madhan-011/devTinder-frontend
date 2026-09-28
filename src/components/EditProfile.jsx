import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/subStore/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));

      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <main className="app-shell">
      <section className="app-container page-section">
        <div className="mb-8">
          <span className="app-tag">Your account</span>

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
                <label className="mb-1.5 block text-sm font-semibold">
                  First name
                </label>

                <input
                  type="text"
                  value={firstName}
                  className="app-input"
                  placeholder="First name"
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
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
                  placeholder="Last name"
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-semibold">
                Profile photo URL
              </label>

              <input
                type="text"
                value={photoUrl}
                className="app-input"
                placeholder="https://example.com/photo.jpg"
                onChange={(e) =>
                  setPhotoUrl(e.target.value)
                }
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Age
                </label>

                <input
                  type="number"
                  value={age}
                  className="app-input"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Gender
                </label>

                <select
                  value={gender}
                  className="app-input"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-semibold">
                About
              </label>

              <textarea
                value={about}
                className="app-input min-h-32 resize-y"
                placeholder="Tell other developers about yourself..."
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {error && (
              <div role="alert" className="alert alert-error mt-4">
                <span>
                  {typeof error === "string"
                    ? error
                    : error?.message ||
                      "Unable to save profile"}
                </span>
              </div>
            )}

            <button
              className="app-button app-button-primary mt-6 w-full"
              onClick={saveProfile}
            >
              Save changes
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
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditProfile;