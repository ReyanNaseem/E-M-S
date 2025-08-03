import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth.slice";

export const store = configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer
    }
})