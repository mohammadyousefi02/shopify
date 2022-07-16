import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    images: [String],
    price: String,
    postedAt:Number,
    sizes:[{
        size:String,
        colors:[String]
    }],
    category:String
})

const Products = mongoose.models.Products || mongoose.model("Products",productSchema)

export default Products;