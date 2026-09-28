
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequests,
  removeRequest,
} from "../store/subStore/requestSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatach = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatach(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true },
      );
      dispatach(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  return (
    <main className="app-shell">
      <section className="app-container page-section">
        <div className="mb-7">
          <span className="app-tag">Grow your network</span>
          <h1 className="app-heading mt-3">
            Connection requests
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Developers who want to connect with you.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="app-panel py-16 text-center">
            <div className="text-3xl">♧</div>
            <h2 className="mt-4 text-xl font-bold">
              No pending requests
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              New connection requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => {
              const {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              } = request.fromUserId;

              return (
                <article
                  key={request._id}
                  className="app-panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
                >
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="h-16 w-16 shrink-0 rounded-full border border-gray-200 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-gray-800">
                      {firstName} {lastName}
                    </h2>

                    {(age || gender) && (
                      <p className="mt-1 text-xs capitalize text-gray-500">
                        {[age, gender].filter(Boolean).join(" · ")}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-2 break-words text-sm text-gray-600">
                      {about || "No bio available."}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      className="app-button app-button-outline"
                      onClick={() =>
                        reviewRequest("rejected", request._id)
                      }
                    >
                      Reject
                    </button>
                    <button
                      className="app-button app-button-primary"
                      onClick={() =>
                        reviewRequest("accepted", request._id)
                      }
                    >
                      Accept
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Requests;