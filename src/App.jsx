import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed"
import { Provider } from "react-redux";
import appStore from "./store/appStore";

const App = () => {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}/>
            <Route path="/login" element={<Login />} />  {/* children routes accessed using outlet component  */}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
