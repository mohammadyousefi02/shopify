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
            let newProduct = new Products({name,images,price,sizes,category,number,postedAt:new Date(), comments:[],star:"5"})
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
            const newProduct:any = {name,price,sizes,category,number}
            if(images) newProduct.images = images
            const categoryDoc = await Category.findOne({name:category})
            const product = await Products.findByIdAndUpdate(id,{...newProduct})
            const prevCateg = await Category.findOne({name:product.category})
            await categoryDoc.addProduct(id)
            await prevCateg.removeProduct(id)
            res.status(200).send('done')
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
            const category = await Category.findOne({name:product.category})
            await category.removeProduct(id)
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
        const product = await Products.findOne({number:id})
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
        const {name,comment,star} = req.body
        const product = await Products.findById(id)
        if(product){
            await product.addComment(name,comment,new Date(), decoded._id, star)
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

const getStars = async(req:NextApiRequest, res:NextApiResponse) => {
    try{
        const {id} = req.query
        const product = await Products.findById(id)
        if(product){
            res.status(200).json(product.star)
        }else{
            res.status(404).send({error:"the entered id is not found"})
        }
    }catch(error){
        res.status(400).send({error})
    }
}

export { getAllProduct, createProduct, getOneProduct, editProduct, deleteProduct, addComment, getComments, getStars }