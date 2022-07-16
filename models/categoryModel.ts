import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name:String,
    products:{
        type:[mongoose.Schema.Types.ObjectId],
        red:'Products'
    }
})

categorySchema.methods.addProduct = function(id:mongoose.Schema.Types.ObjectId){
    this.products = [...this.products, id]
    return this.save()
}

const Category = mongoose.models.Categories || mongoose.model('Categories', categorySchema)

export default Category