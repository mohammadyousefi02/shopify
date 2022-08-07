import { createSlice } from "@reduxjs/toolkit";
interface Istate {
    items:any[]
}

const initialState:Istate = {
    items:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action) => {
            state.items = action.payload.items
        },
        addToCart:(state,action)=>{
            const newItem = action.payload.item
            const productIndex:number = state.items.findIndex((p)=>{
                return p.product._id === newItem.product._id && p.size === newItem.size && p.color === newItem.color
            })
            if(productIndex>=0){
                const newQuantity = state.items[productIndex].quantity + 1
                state.items[productIndex].quantity = newQuantity
            }else{
                state.items = [...state.items, {...newItem,quantity:1}]
            }
        },
        decreaseItemQuantity:(state,action)=>{
            const {_id,color,size} = action.payload
            const productIndex:number = state.items.findIndex((p)=>{
                return p.product._id === _id && p.size === size && p.color === color
            })
            const newQuantity:number = state.items[productIndex].quantity - 1
            if(newQuantity === 0){
                state.items.splice(productIndex,1)
            }else{
                state.items[productIndex].quantity = newQuantity
            }
        },
        removeFromCart:(state, action) => {
            const {_id,color,size} = action.payload
            const productIndex:number = state.items.findIndex((p)=>{
                return p.product._id === _id && p.size === size && p.color === color
            })
            state.items.splice(productIndex,1)
        },
        emptyCart:(state)=>{
            state.items = []
        }
    }
})

export const {setCart, addToCart, decreaseItemQuantity, removeFromCart, emptyCart} = cartSlice.actions

export default cartSlice.reducer