import { NextApiRequest, NextApiResponse } from "next"

import Products from "../models/productModel"

const getAllProduct = async(req: NextApiRequest,res: NextApiResponse) => {
    try{
        const products = await Products.find()
        res.status(200).json( products )
    }catch(e){
        res.status(400).send({error:"something went wrong"})
    }
}

const createProduct = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        const {name,image,price,size} = req.body;
        let newProduct = new Products({name,image,price,size,postedAt:new Date()})
        newProduct = await newProduct.save()
        res.status(200).json(newProduct)
       }catch(error){
        res.status(400).send({error})
       }
}

const getOneProduct = async (req:NextApiRequest, res:NextApiResponse) => {
    try{
        const {id} = req.query
        const post = await Products.findById(id)
        if(post) res.status(200).json(post)
        else res.status(404).send({error:"the entered id is not found"})
    }catch(error){
        res.status(400).send({error})
    }
}

export { getAllProduct, createProduct, getOneProduct }