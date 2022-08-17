import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Users'
            },
            name:String,
            province:String,
            city:String,
            address:String,
            zipcode:Number,
            number:Number
        })
    },
    order:{
        type:{
            items:[Object],
            total:Number,
            createdAt:Number
        }
    },
    delivered:Boolean,
    deliveredAt:Number,
})

ordersSchema.methods.changeDeliveryStatus = function(){
    this.delivered = true;
    this.deliveredAt = new Date().getTime();
    return this.save()
}

// {quantity:Number,product:Object,total:Number}
const Orders = mongoose.models.Orders || mongoose.model("Orders",ordersSchema)

export default Orders;


