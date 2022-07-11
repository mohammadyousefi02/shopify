import { createSlice } from '@reduxjs/toolkit';


interface Istate {
    items:any[]
}

const initialState:Istate = {
    items:[]
}

const savedItemSlice = createSlice({
    name:"savedItem",
    initialState,
    reducers:{
        setSavedItems : (state,action) => {
            state.items = action.payload.items
        },
        addSavedItem : (state,action)=>{
            state.items = [...state.items,action.payload.item]
        },
        removeSavedItem : (state, action) => {
            state.items = state.items.filter(i=>i.product._id !== action.payload.id)
        }
    }
})

export const {setSavedItems, addSavedItem, removeSavedItem} = savedItemSlice.actions

export default savedItemSlice.reducer