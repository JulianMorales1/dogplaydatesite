
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:'user',
    user:null
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log(action)
            state.user=action.payload.user
        },
        logout:(state)=>{
            state.user=null;
        }

    }
})

export const {login,logout} = userSlice.actions;

export default userSlice.reducer;