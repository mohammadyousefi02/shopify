import mongoose from "mongoose"

const discountSchema = new mongoose.Schema({
    code:String,
    value:Number
})


const Discount = mongoose.models.Discount || mongoose.model("Discount", discountSchema)

export default Discount