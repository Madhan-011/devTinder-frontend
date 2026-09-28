import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/subStore/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
  } = user;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const SWIPE_THRESHOLD = 120;

  const sendRequest = async (status) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err.message);

      setPosition({ x: 0, y: 0 });
      setIsSwiping(false);
    }
  };

  const swipeCard = (status) => {
    if (isSwiping) return;

    setIsSwiping(true);

    const direction = status === "interested" ? 1 : -1;

    setPosition({
      x: direction * 700,
      y: position.y,
    });

    setTimeout(() => {
      sendRequest(status);
    }, 300);
  };

  const handlePointerDown = (e) => {
    if (!showActions || isSwiping) return;

    setIsDragging(true);

    startX.current = e.clientX;
    startY.current = e.clientY;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isSwiping) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    setPosition({
      x: deltaX,
      y: deltaY,
    });
  };

  const handlePointerUp = () => {
    if (!isDragging || isSwiping) return;

    setIsDragging(false);

    const { x } = position;

    if (Math.abs(x) < SWIPE_THRESHOLD) {
      setPosition({
        x: 0,
        y: 0,
      });

      return;
    }

    const status = x > 0 ? "interested" : "ignored";

    setIsSwiping(true);

    setPosition({
      x: x > 0 ? 700 : -700,
      y: position.y,
    });

    setTimeout(() => {
      sendRequest(status);
    }, 300);
  };

  const handlePointerCancel = () => {
    if (!isDragging) return;

    setIsDragging(false);

    setPosition({
      x: 0,
      y: 0,
    });
  };

  const rotation = position.x * 0.08;

  const swipeLabel =
    position.x > 40
      ? "CONNECT"
      : position.x < -40
        ? "PASS"
        : "";

  const swipeLabelClass =
    position.x > 40
      ? "border-success text-success"
      : "border-error text-error";

  return (
    <article
      className={`app-panel w-full max-w-[390px] overflow-hidden ${
        showActions ? "select-none" : ""
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
        transition: isDragging
          ? "none"
          : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        touchAction: showActions ? "none" : "auto",
        cursor: showActions
          ? isDragging
            ? "grabbing"
            : "grab"
          : "default",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="profile-photo"
          draggable="false"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-700 shadow-sm">
          Developer
        </span>

        {swipeLabel && (
          <div
            className={`absolute right-4 top-4 rotate-[-8deg] rounded-lg border-2 bg-white/95 px-3 py-1 text-sm font-extrabold tracking-wider shadow-sm ${swipeLabelClass}`}
          >
            {swipeLabel}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
            {firstName} {lastName}
          </h2>

          {age && (
            <span className="text-sm text-gray-500">
              {age}
            </span>
          )}
        </div>

        {gender && (
          <p className="mt-1 text-sm capitalize text-gray-500">
            {gender}
          </p>
        )}

        <div className="my-4 border-t border-gray-100" />

        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          About
        </h3>

        <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-gray-700">
          {about || "This developer hasn't added a bio yet."}
        </p>

        {showActions && (
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              className="app-button app-button-outline"
              disabled={isSwiping}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                swipeCard("ignored");
              }}
            >
              <span className="text-lg" aria-hidden="true">
                ×
              </span>
              Pass
            </button>

            <button
              type="button"
              className="app-button app-button-primary"
              disabled={isSwiping}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                swipeCard("interested");
              }}
            >
              <span aria-hidden="true">＋</span>
              Connect
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;