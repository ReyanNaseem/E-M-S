import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'AuthSlice',
    initialState:{
        user:null
    },
    reducers:{
        setUser(state,action){
            state.user = action.payload
        },
        removeUser(state){
            state.user = null
        }
    }
})

export const {setUser, removeUser} = authSlice.actions;
export const authSlicePath = (store)=>store.authSlice.user;