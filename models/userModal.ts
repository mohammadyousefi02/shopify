import mongoose from "mongoose";

import jwt from "jsonwebtoken"
import _ from "lodash";

import { Iorder } from "../interfaces/orderInterface";

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isAdmin:Boolean,
   cart:{
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Products'
            },
            quantity:Number,
            size:String,
            color:String
        }
    ]
},
saved:{
   items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Products'
            }
        }
] 
},
orders:[Object]
})

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign(_.pick(this,['_id', 'isAdmin']), process.env.jwtPrivateKey!);
    return token;
}

interface Iproduct{
    _id:mongoose.Schema.Types.ObjectId,
    name:string,
    image:string,
    price:string,
    size:string[]
}



interface IcartProduct {
    product:mongoose.Schema.Types.ObjectId,
    quantity:number,
    size:string,
    color:string
}

userSchema.methods.addToCart = function(product:Iproduct,size:string, color:string){
    const productIndex:number = this.cart.items.findIndex((p:IcartProduct)=>{
        return p.product.toString() === product._id.toString() && p.size === size && p.color === color
    })
    let newQuantity = 1;
    const copyCartItems = [...this.cart.items]
    if(productIndex>=0){
        newQuantity = this.cart.items[productIndex].quantity + 1
        copyCartItems[productIndex].quantity = newQuantity
    }else{
        copyCartItems.push({
            product:product._id,
            quantity:newQuantity,
            size,
            color
        })
    }
    const updatedCart = {
        items:copyCartItems
    }
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.decreaseCartItemQuantity = function(productId:mongoose.Schema.Types.ObjectId,size:string, color:string){
    const productIndex = this.cart.items.findIndex((p:IcartProduct)=>p.product.toString() === productId.toString() && p.size === size && p.color === color )
    let copyCartItems = [...this.cart.items]
    const newQuantity:number = copyCartItems[productIndex].quantity - 1
    if(newQuantity === 0){
        copyCartItems.splice(productIndex,1)
    }else{
        copyCartItems[productIndex].quantity = newQuantity
    }
    const updatedCart = {
        items:copyCartItems
    }
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart = {
        items:[]
    }
    return this.save()
}

interface IsavedItem{
    product:mongoose.Schema.Types.ObjectId
}

userSchema.methods.saveItem = function(productId:mongoose.Schema.Types.ObjectId){
    let copySavedItems = [...this.saved.items]
    const existedSaveItem = this.saved.items.find((p:IsavedItem)=>p.product.toString() === productId.toString())
    if(!existedSaveItem) copySavedItems.push({product:productId})
    this.saved = {items:copySavedItems}
    return this.save()
}

userSchema.methods.removeSaveItem = function(productId:mongoose.Schema.Types.ObjectId){
    let copySavedItems = [...this.saved.items]
    copySavedItems = this.saved.items.filter((p:IsavedItem)=>p.product.toString() !== productId.toString())
    this.saved = {items:copySavedItems}
    return this.save()
}

userSchema.methods.addOrder = function(order:Iorder){
    this.orders = [...this.orders, order]
    return this.save()
}

const Users = mongoose.models.Users || mongoose.model("Users",userSchema)

export default Users;


