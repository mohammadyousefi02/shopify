import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { IcartItem } from '../interfaces/cartInterface';
import { IdecodedToken } from '../interfaces/decodedTokenInterface';

import Orders from "../models/ordersModal";
import Users from '../models/userModal';


const sendOrders = async(req:NextApiRequest, res:NextApiResponse)=>{
    try{
        const {name,province,city,address} = req.body
        const token = <string>req.headers['x-auth-token']
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const user = await Users.findById(decoded._id).populate("cart.items.product")
        const items = user.cart.items.map((i:IcartItem)=>{
            return {...i,total:i.quantity * Number(i.product.price)}
        })
        const newOrders = new Orders({
            customer:{
                user:user._id,
                name,province,city,address
            },
            order:{
                items: [...items],
                createdAt:new Date(),
                total:_.sumBy(items,"total")
            }
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


export {sendOrders, getOrder}