import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../config/server";

// export const getUserData = createAsyncThunk('getUserData',async(id:string)=>{
//     try {
//         const res = await axios.get(`${server}/api/users/${id}`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// })

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:{},
        pending: "idle"
    },
    // extraReducers:{
    //     [getUserData.pending.type] : (state:any,action:any)=>{
    //         state.pending = "pending"
    //     },
    //     [getUserData.fulfilled.type] : (state:any,action:any)=>{
    //         state.pending = "success"
    //         state.user = action.payload
    //     },
    //     [getUserData.rejected.type] : (state:any,action:any)=>{
    //         state.pending = "rejected"
    //     }
    // },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user
        }
    }
})


export const {setUser} = userSlice.actions


export default userSlice.reducer