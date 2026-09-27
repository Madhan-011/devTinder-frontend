import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/subStore/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        <div className="flex gap-2">
          {age && <span>{age}</span>}
          {gender && <span>{gender}</span>}
        </div>

        <p>{about}</p>

        {showActions && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
