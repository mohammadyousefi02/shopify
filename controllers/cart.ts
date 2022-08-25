import { Iproduct } from './../interfaces/productInterface';
import { NextApiRequest, NextApiResponse } from "next";

import  jwt  from 'jsonwebtoken';

import Products from "../models/productModel";
import Users from '../models/userModal';
import Discount from "../models/discountModel";

import { IdecodedToken } from "../interfaces/decodedTokenInterface";

const cartHandler = async(req:NextApiRequest, res:NextApiResponse, apiRoute:string) => {
       try {
        const token:string = <string>req.headers["x-auth-token"]
        const { id } = req.query
        const { size, color } = req.body
        const product:Iproduct | null = await Products.findById(id)
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        const user = await Users.findById(decoded._id)
        if(apiRoute === "add"){
                const response = user.addToCart(product, size, color)
                if(response){
                    res.status(200).send("increase")  
                }else{
                    res.status(400).send({error:"تعداد محصول وارد شده بیشتر از حد موجود است"})
                }
           
        }else if(apiRoute === "remove"){
            await user.deleteItemFromCart(id, size, color)
            res.status(200).send("remove")  
        }else if(apiRoute === "empty"){
            await user.clearCart()
            res.status(200).send("empty")  
        }else{
            await user.decreaseCartItemQuantity(product,size, color)
            res.status(200).send("ok decrease")
        }
       } catch (error) {
        res.status(400).send({error})
       }
}

const setDiscountCode = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const token:string = <string>req.headers["x-auth-token"]
        const { code } = req.body
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        const discount = await Discount.findOne({code})
        if(!discount)return res.status(400).send("invalid code")
        const user = await Users.findById(decoded._id)
        await user.setDiscount(discount.value)
        res.status(200).send(discount.value)
    } catch (error) {
        res.status(400).send({error})
    }
}

export {cartHandler, setDiscountCode}