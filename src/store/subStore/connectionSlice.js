import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnections: (state, action)=>action.payload,
        removeConnections: ()=> null,
        clearRequests: () => null,
    }
})

export const  {addConnections, removeConnections, clearRequests} = connectionSlice.actions;
export default connectionSlice.reducer;