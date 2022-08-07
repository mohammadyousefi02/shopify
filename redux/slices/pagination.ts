import {createSlice} from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name:"pagination",
    initialState:{
        row:18,
        page:1,
        totalPage:1,
    },
    reducers:{
        changeRow:(state,action)=>{
            state.row = action.payload
        },
        nextPage:(state)=>{
            if(state.page + 1 > state.totalPage) return state
            state.page = state.page + 1
        },
        prevPage:(state)=>{
            if(state.page - 1 === 0)return state
            state.page = state.page - 1
        },
        setPage:(state,action)=>{
            state.page = action.payload
        },
        setTotalPage:(state,action)=>{
            state.totalPage = action.payload
        }
    }
})

export const {changeRow,nextPage,prevPage,setTotalPage, setPage} = paginationSlice.actions;

export default paginationSlice.reducer;