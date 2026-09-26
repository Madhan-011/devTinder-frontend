import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./subStore/userSlice"
import feedReducer from "./subStore/feedSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    }
})

export default appStore;