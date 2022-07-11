import { NextApiRequest, NextApiResponse } from 'next';

import { getOneProduct } from '../../../controllers/product';
import connectToDb from '../../../utils/coonectToDb';

export default async function getProductById( req: NextApiRequest,res: NextApiResponse ){

        await connectToDb()
        if(req.method === "GET") getOneProduct(req,res)
        else res.status(400).send({error:"this is a bad request"})
        
}