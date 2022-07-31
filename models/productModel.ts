import { Isize } from './../interfaces/productInterface';
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    images: [String],
    price: String,
    postedAt:Number,
    number:Number,
    sizes:[{
        size:String,
        colors:[String],
        quantity:Number
    }],
    comments:[
        {name:String, comment:String, date:Number,
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Users'
            }
        }
    ],
    category:String
})


productSchema.methods.decreaseQuantity = function(size:string, quantity:number){
    const index = this.sizes.findIndex((i:Isize)=>i.size === size)
    this.sizes[index].quantity = this.sizes[index].quantity - quantity
    return this.save()
}

productSchema.methods.addComment = function(name:string, comment:string, date:number, user:mongoose.Schema.Types.ObjectId){
    this.comments = [...this.comments, {name, comment, date, user}]
    return this.save()
}

const Products = mongoose.models.Products || mongoose.model("Products",productSchema)

export default Products;