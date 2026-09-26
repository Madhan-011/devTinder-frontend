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
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
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
    <div className="min-h-screen bg-[#0f0f0f] py-10">
      <div className="flex justify-center items-start gap-16">
        <div className="w-96">
          <h2 className="text-2xl font-semibold text-[#d4af37] text-center mb-5">
            Profile Preview
          </h2>

          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            }}
          />
        </div>
        <div className="card w-122 bg-[#171717] border border-[#3d3315] shadow-2xl shadow-black/50">
          <div className="card-body">

            <div className="text-center mb-5">
              <h2 className="text-3xl font-bold text-[#d4af37]">
                Edit Profile
              </h2>

              <p className="text-[#a1a1a1] mt-1">
                Update your developer profile
              </p>
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-[#d4af37] font-medium">
                  First Name
                </span>
              </label>

              <input
                type="text"
                value={firstName}
                className="input w-full bg-[#111111] border border-[#66551f] text-[#f5f5f5] placeholder:text-[#777] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-[#d4af37] font-medium">
                  Last Name
                </span>
              </label>

              <input
                type="text"
                value={lastName}
                className="input w-full bg-[#111111] border border-[#66551f] text-[#f5f5f5] placeholder:text-[#777] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-[#d4af37] font-medium">
                  Profile Photo URL
                </span>
              </label>

              <input
                type="text"
                value={photoUrl}
                className="input w-full bg-[#111111] border border-[#66551f] text-[#f5f5f5] placeholder:text-[#777] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                placeholder="Enter photo URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-[#d4af37] font-medium">
                  Age
                </span>
              </label>

              <input
                type="number"
                value={age}
                className="input w-full bg-[#111111] border border-[#66551f] text-[#f5f5f5] placeholder:text-[#777] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                placeholder="Enter age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-[#d4af37] font-medium">
                  Gender
                </span>
              </label>

              <select
                value={gender}
                className="select w-full bg-[#111111] border border-[#66551f] text-[#f5f5f5] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
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

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-[#d4af37] font-medium">
                  About
                </span>
              </label>

              <textarea
                value={about}
                className="textarea w-full h-28 bg-[#111111] border border-[#66551f] text-[#f5f5f5] placeholder:text-[#777] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] resize-none"
                placeholder="Tell developers about yourself..."
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-error mt-3">
                <span>{error}</span>
              </div>
            )}

            {/* Save Button */}
            <div className="card-actions justify-center mt-5">
              <button
                className="btn w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#111111] border-none font-semibold shadow-lg shadow-[#d4af37]/20"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-[#d4af37] text-[#111111] border-none shadow-xl">
            <span className="font-semibold">
              Profile saved successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;