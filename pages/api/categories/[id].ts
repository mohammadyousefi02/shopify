import { NextApiRequest, NextApiResponse } from 'next';

import { deleteCategory, editCategory, getOneCategory } from '../../../controllers/category';

import connectToDb from '../../../utils/coonectToDb';

export default async function getProductById( req: NextApiRequest,res: NextApiResponse ){

        await connectToDb()
        if(req.method === "GET") getOneCategory(req,res)
        else if(req.method === "PUT") editCategory(req,res)
        else if(req.method === "DELETE") deleteCategory(req,res)
        else res.status(400).send({error:"this is a bad request"})
        
}