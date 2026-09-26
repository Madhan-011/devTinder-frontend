import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./subStore/userSlice"
import feedReducer from "./subStore/feedSlice"
import  connectionReducer from "./subStore/connectionSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
    }
})

export default appStore;