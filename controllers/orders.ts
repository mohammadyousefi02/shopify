import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { IcartItem } from '../interfaces/cartInterface';
import { IdecodedToken } from '../interfaces/decodedTokenInterface';

import Orders from "../models/ordersModel";
import Users from '../models/userModal';
import Products from '../models/productModel';


const sendOrders = async(req:NextApiRequest, res:NextApiResponse)=>{
    try{
        const {name,province,city,address,zipCode,number} = req.body
        const token = <string>req.headers['x-auth-token']
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const user = await Users.findById(decoded._id).populate("cart.items.product")
        user.cart.items.forEach(async(i:IcartItem)=>{
            const product = await Products.findById(i.product._id)
            await product.decreaseQuantity(i.size, i.quantity)
        })
        const newOrders = new Orders({
            customer:{
                user:user._id,
                name,province,city,address,zipCode,number
            },
            order:{
                items: user.cart.items,
                createdAt:new Date(),
                total:user.cart.total - user.cart.discount,
            },
            delivered:false
        })
        await newOrders.save()
        await user.clearCart()
        await user.addOrder(newOrders.order)
        res.status(200).send(newOrders)
    }catch(error){
        res.status(400).send({error})
    }
}

const getOrder = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const {id} = req.query
        const order = await Orders.findOne({'order._id':id})
        res.status(200).send(_.pick(order,['order']))
    } catch (error) {
        res.status(400).send({error})
    }
}

const getAllOrders = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const orders = await Orders.find()
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({error})
    }
}

const changeDeliveryStatus = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const token = <string>req.headers['x-auth-token']
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const { id } = req.query
        if(decoded.isAdmin){
            const order = await Orders.findById(id)
            await order.changeDeliveryStatus()
            res.status(200).send("changed")
        }else{
            res.status(403).send({error: 'access denied'})
        }
    } catch (error) {
        res.status(400).send({error})
    }
}

export {sendOrders, getAllOrders, getOrder, changeDeliveryStatus}