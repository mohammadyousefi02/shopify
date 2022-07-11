import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    sizes: [String],
    colors:[String],
    postedAt:Number
})

const Products = mongoose.models.Products || mongoose.model("Products",productSchema)

export default Products;