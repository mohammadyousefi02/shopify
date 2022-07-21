import { Iproduct } from './../../interfaces/productInterface';
import { createSlice } from "@reduxjs/toolkit";

interface Istate {
    products:Iproduct[],
    filterByNameValue:string,
    filteredProducts:Iproduct[],
    productsByCategory:Iproduct[]
}

const initialState:Istate = {
    products:[],
    filterByNameValue:"",
    filteredProducts:[],
    productsByCategory:[]
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload.products
        },
        setFilterByNameValue:(state,action) => {
            state.filterByNameValue = action.payload
        },
        filterProducts:(state)=>{
            if(!state.filterByNameValue)state.filteredProducts = []
            else{
                state.filteredProducts = []
                state.products.map(p=>{
                    p.name.includes(state.filterByNameValue) ? state.filteredProducts = [...state.filteredProducts,p] : false
                })
            }
        },
        setProductsByCategory:(state,action)=>{
            const products:Iproduct[] = []
            state.products.forEach(p=>{
                if(p.category === action.payload)products.push(p)
            })
            state.productsByCategory = [...products]
        }
    }
})

export const { setProducts, setFilterByNameValue, filterProducts, setProductsByCategory } = productsSlice.actions

export default productsSlice.reducer