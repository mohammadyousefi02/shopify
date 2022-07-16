import jwt from 'jsonwebtoken';
import { IdecodedToken } from './../interfaces/decodedTokenInterface';
import { NextApiRequest, NextApiResponse } from 'next';
import Category from "../models/categoryModel";


const createCategory = async(req:NextApiRequest, res:NextApiResponse) => {
    const token:string = <string>req.headers["x-auth-token"]
    const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
    try {
        if(decoded.isAdmin){
            const {name} = req.body
            let category = new Category({name,products:[]})
            category = await category.save()
            res.status(201).send(category)
        }else{
            res.status(403).send({error:'access denied'})
        }
    } catch (error) {
        res.status(400).send({error})
    }
}

const getAllCategories = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const categories = await Category.find().populate('products')
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send({error})
    }
}

const getOneCategory = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const { id } = req.query
        const category = await Category.findById(id).populate('products')
        res.status(200).send(category)
    } catch (error) {
        res.status(400).send({error})
    }
}

export {createCategory, getAllCategories, getOneCategory}