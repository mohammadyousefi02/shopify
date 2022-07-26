import { Iproduct } from './../../interfaces/productInterface';
import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

interface Istate {
    products:Iproduct[],
    filterByNameValue:string,
    sort:'جدید ترین'|'گران ترین'|'ارزان ترین',
    filterByCategoryValue:string,
    filteredProducts:Iproduct[],
    productsByCategory:Iproduct[]
}

const initialState:Istate = {
    products:[],
    filterByNameValue:"",
    filteredProducts:[],
    productsByCategory:[],
    sort:'جدید ترین',
    filterByCategoryValue:"همه کالاها"
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
        changeSortValue:(state,action) => {
            state.sort = action.payload
        },
        changeFilterByCategoryValue:(state, action) => {
            state.filterByCategoryValue = action.payload
        },
        filterProducts:(state)=>{
            if(!state.filterByNameValue)state.filteredProducts = []
            else{
                state.filteredProducts = []
                state.products.map(p=>{
                    p.name.includes(state.filterByNameValue) ? state.filteredProducts = [...state.filteredProducts,p] : false
                })
                state.filteredProducts = _.orderBy(state.filteredProducts,[state.sort === 'جدید ترین' ? "createdAt" : 'price'],[state.sort === 'ارزان ترین' ? 'asc' : 'desc']);
                !(state.filterByCategoryValue === "همه کالاها") ? state.filteredProducts = state.filteredProducts.filter(p=>p.category === state.filterByCategoryValue) : false
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

export const { setProducts, setFilterByNameValue, filterProducts, setProductsByCategory, changeSortValue, changeFilterByCategoryValue } = productsSlice.actions

export default productsSlice.reducer