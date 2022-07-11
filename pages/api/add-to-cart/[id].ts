import { NextApiRequest, NextApiResponse } from 'next';

import { cartHandler } from '../../../controllers/cart';

import connectToDb from '../../../utils/coonectToDb';

const addToCartHandler = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "POST") cartHandler(req,res,"add")
    else res.status(400).send({error:"this is a bad request"})

}



export default addToCartHandler