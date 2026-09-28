import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/subStore/feedSlice";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <main className="app-shell">
        <section className="app-container page-section">
          <div className="mx-auto max-w-xl rounded-2xl border border-base-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-2xl">
              ♧
            </div>

            <h1 className="mt-5 text-2xl font-extrabold">
              You're all caught up
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              There are no new developers to discover right now.
              Check back later.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="app-container page-section">
        <div className="mb-8 text-center">
          <span className="app-tag">Developer community</span>

          <h1 className="app-heading mt-3">
            Find your next connection
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Meet developers, exchange ideas and build together.
          </p>
        </div>

        <div className="relative mx-auto h-[570px] w-full max-w-[390px]">
          {/* Back card */}
          {feed[1] && (
            <div className="absolute inset-x-0 top-4 z-10 flex justify-center">
              <div className="w-[94%] scale-[0.96]">
                <UserCard
                  user={feed[1]}
                  showActions={false}
                />
              </div>
            </div>
          )}

          {/* Front card */}
          <div className="absolute inset-x-0 top-0 z-20 flex justify-center">
            <UserCard
              key={feed[0]._id}
              user={feed[0]}
              showActions={true}
            />
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-medium text-gray-400">
          ← Swipe left to pass &nbsp; • &nbsp; Swipe right to connect →
        </p>
      </section>
    </main>
  );
};

export default Feed;