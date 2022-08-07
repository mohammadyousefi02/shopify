import { Iproduct } from './../../interfaces/productInterface';
import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

interface Istate {
    products:Iproduct[],
    filterByNameValue:string,
    sort:'جدید ترین'|'گران ترین'|'ارزان ترین',
    categorySort:'جدید ترین'|'گران ترین'|'ارزان ترین',
    filterByCategoryValue:string,
    searchedProducts:Iproduct[],
    filteredProducts:Iproduct[],
    productsByCategory:Iproduct[],
    filteredCategoryProducts:Iproduct[],
    categoryMinPrice:string,
    categoryMaxPrice:string,
    searchMinPrice:string,
    searchMaxPrice:string,
}

const initialState:Istate = {
    products:[],
    filterByNameValue:"",
    filteredProducts:[],
    productsByCategory:[],
    filteredCategoryProducts:[],
    searchedProducts:[],
    sort:'جدید ترین',
    categorySort:'جدید ترین',
    filterByCategoryValue:"همه کالاها",
    categoryMinPrice:"0",
    categoryMaxPrice:"500000",
    searchMinPrice:"0",
    searchMaxPrice:"500000",
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
        changeCategorySortValue:(state,action) => {
            state.categorySort = action.payload
        },
        changeFilterByCategoryValue:(state, action) => {
            state.filterByCategoryValue = action.payload
        },
        setProductsBySearch:(state)=>{
            if(!state.filterByNameValue)state.filteredProducts = []
            else{
                state.sort = 'جدید ترین'
                state.searchMinPrice = "0"
                state.searchMaxPrice = "500000"
                state.filterByCategoryValue = "همه کالاها"
                state.filteredProducts = []
                state.products.map(p=>{
                    p.name.includes(state.filterByNameValue) ? state.filteredProducts = [...state.filteredProducts,p] : false
                })
                state.searchedProducts = state.filteredProducts
                state.filteredProducts = _.orderBy(state.filteredProducts, ['postedAt'], ['desc'])
            }
        },
        filterSearchedProducts:(state)=>{
            !(state.filterByCategoryValue === "همه کالاها") ? state.filteredProducts = state.searchedProducts.filter(p=>p.category === state.filterByCategoryValue) :  state.filteredProducts = state.searchedProducts
            state.filteredProducts = state.filteredProducts.filter(p=>_.inRange(Number(p.price),Number(state.searchMinPrice), Number(state.searchMaxPrice)))
            state.filteredProducts = _.orderBy(state.filteredProducts,[state.sort === 'جدید ترین' ? "postedAt" : 'price'],[state.sort === 'ارزان ترین'? 'asc' : 'desc']);
        },
        setProductsByCategory:(state,action)=>{
            const products:Iproduct[] = []
            state.categorySort = 'جدید ترین'
            state.categoryMinPrice = "0"
            state.categoryMaxPrice = "500000"
            
            state.products.forEach(p=>{
                if(p.category === action.payload)products.push(p)
            })
            state.productsByCategory = _.orderBy(products, ['postedAt'], ['desc']);
            state.filteredCategoryProducts = state.productsByCategory
        },
        changeCategoryPriceRange:(state, action) => {
            if(action.payload.min) state.categoryMinPrice = action.payload.min
            if(action.payload.max) state.categoryMaxPrice = action.payload.max
        },
        changesearchPriceRange:(state, action) => {
            if(action.payload.min) state.searchMinPrice = action.payload.min
            if(action.payload.max) state.searchMaxPrice = action.payload.max
        },
        sortProductsByCategory:(state) => {
            state.productsByCategory = state.filteredCategoryProducts.filter(p=>_.inRange(Number(p.price),Number(state.categoryMinPrice), Number(state.categoryMaxPrice)))
            state.productsByCategory = _.orderBy(state.productsByCategory,[state.categorySort === 'جدید ترین' ? "postedAt" : 'price'],[state.categorySort === 'ارزان ترین' ? 'asc' : 'desc']);
        }
    }
})

export const { setProducts, setFilterByNameValue, setProductsBySearch, filterSearchedProducts, setProductsByCategory, changeSortValue, changeCategorySortValue, changeFilterByCategoryValue, sortProductsByCategory, changeCategoryPriceRange, changesearchPriceRange} = productsSlice.actions

export default productsSlice.reducer