
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/subStore/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  return (
    <main className="app-shell">
      <section className="app-container page-section">
        <div className="mb-7">
          <span className="app-tag">Your network</span>
          <h1 className="app-heading mt-3">Connections</h1>
          <p className="mt-2 text-sm text-gray-500">
            Developers you've connected with.
          </p>
        </div>

        {connections.length === 0 ? (
          <div className="app-panel py-16 text-center">
            <div className="text-3xl">♧</div>
            <h2 className="mt-4 text-xl font-bold">
              No connections yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Discover developers and start building your network.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => {
              const {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              } = connection;

              return (
                <article
                  key={connection._id}
                  className="app-panel flex min-w-0 gap-4 p-4"
                >
                  <img
                    alt={`${firstName} ${lastName}`}
                    className="h-16 w-16 shrink-0 rounded-full border border-gray-200 object-cover"
                    src={photoUrl}
                  />

                  <div className="min-w-0">
                    <h2 className="truncate font-bold text-gray-600">
                      {firstName} {lastName}
                    </h2>

                    {(age || gender) && (
                      <p className="mt-1 text-xs capitalize text-gray-500">
                        {[age, gender].filter(Boolean).join(" · ")}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-3 wrap-break-word text-sm leading-5 text-gray-600">
                      {about || "No bio available."}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-success">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      Connected
                    </span>
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

export default Connections;