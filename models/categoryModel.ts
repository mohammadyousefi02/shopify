import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name:String,
    products:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products'
        }
    ],
})

categorySchema.methods.addProduct = function(id:mongoose.Schema.Types.ObjectId){
    const products = this.products
    const index = products.indexOf(id)
    if(index === -1){
        this.products = [...this.products, id]
    }
    return this.save()
}

categorySchema.methods.removeProduct = function(id:mongoose.Schema.Types.ObjectId){
    const products = this.products
    const index = products.indexOf(id)
    if(index !== -1){
        this.products = products.filter((i:mongoose.Schema.Types.ObjectId)=>i !== id)
    }
    return this.save()
}

const Category = mongoose.models.Categories || mongoose.model("Categories", categorySchema)

export default Category