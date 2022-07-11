import { NextApiRequest, NextApiResponse } from "next";

import  jwt  from 'jsonwebtoken';

import Products from "../models/productModel";
import Users from '../models/userModal';

import { IdecodedToken } from "../interfaces/decodedTokenInterface";

const cartHandler = async(req:NextApiRequest, res:NextApiResponse, apiRoute:string) => {
       try {
        const token:string = <string>req.headers["x-auth-token"]
        const { id } = req.query
        const { size, color } = req.body
        const product = await Products.findById(id)
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        const user = await Users.findById(decoded._id)
        if(apiRoute === "add"){
            await user.addToCart(product, size, color)
            res.status(200).send("ok")  
        }else{
            await user.decreaseCartItemQuantity(id,size, color)
            res.status(200).send("ok hazf")
        }
       } catch (error) {
        res.status(400).send({error})
       }
}

export {cartHandler}