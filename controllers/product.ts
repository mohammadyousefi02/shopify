import jwt from 'jsonwebtoken';
import { IdecodedToken } from './../interfaces/decodedTokenInterface';
import { NextApiRequest, NextApiResponse } from "next"

import Products from "../models/productModel"
import Category from "../models/categoryModel"


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
        const token:string = <string>req.headers["x-auth-token"]
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        if(decoded.isAdmin){
            const {name,images,price,sizes,category,number} = req.body;
            let newProduct = new Products({name,images,price,sizes,category,number,postedAt:new Date(), comments:[]})
            newProduct = await newProduct.save()
            const categoryDoc = await Category.findOne({name:category})
            await categoryDoc.addProduct(newProduct._id)
            res.status(200).json(newProduct)
        }else{
            res.status(403).send({error:'access denied'})
        }
       }catch(error){
        res.status(400).send({error})
       }
}

const editProduct = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        const token:string = <string>req.headers["x-auth-token"]
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        const { id } = req.query
        if(decoded.isAdmin){
            const {name,images,price,sizes,category,number} = req.body;
            const product = await Products.findByIdAndUpdate(id,{name,images,price,sizes,category,number},{new:true})
            res.status(200).json(product)
        }else{
            res.status(403).send({error:'access denied'})
        }
       }catch(error){
        res.status(400).send({error})
       }
}

const deleteProduct = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        const token:string = <string>req.headers["x-auth-token"]
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        if(decoded.isAdmin){
            const {id} = req.query;
            const product = await Products.findByIdAndDelete(id)
            res.status(200).json(product)
        }else{
            res.status(403).send({error:'access denied'})
        }
       }catch(error){
        res.status(400).send({error})
       }
}

const getOneProduct = async (req:NextApiRequest, res:NextApiResponse) => {
    try{
        const {id} = req.query
        const product = await Products.findById(id)
        if(product) res.status(200).json(product)
        else res.status(404).send({error:"the entered id is not found"})
    }catch(error){
        res.status(400).send({error})
    }
}

const addComment = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        const token:string = <string>req.headers["x-auth-token"]
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        const {id} = req.query
        const {name,comment} = req.body
        const product = await Products.findById(id)
        if(product){
            await product.addComment(name,comment,new Date(), decoded._id)
            res.status(201).json('comment added')
        }else{
            res.status(404).send({error:"the entered id is not found"})
        }
    }catch(error){
        res.status(400).send({error})
    }
}

const getComments = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        const {id} = req.query
        const product = await Products.findById(id)
        if(product){
            res.status(200).json(product.comments)
        }else{
            res.status(404).send({error:"the entered id is not found"})
        }
    }catch(error){
        res.status(400).send({error})
    }
}

export { getAllProduct, createProduct, getOneProduct, editProduct, deleteProduct, addComment, getComments }