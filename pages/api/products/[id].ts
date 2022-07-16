import { NextApiRequest, NextApiResponse } from 'next';

import { deleteProduct, editProduct, getOneProduct } from '../../../controllers/product';
import connectToDb from '../../../utils/coonectToDb';

export default async function getProductById( req: NextApiRequest,res: NextApiResponse ){

        await connectToDb()
        if(req.method === "GET") getOneProduct(req,res)
        else if(req.method === "PUT") editProduct(req,res)
        else if(req.method === "DELETE") deleteProduct(req,res)
        else res.status(400).send({error:"this is a bad request"})
        
}