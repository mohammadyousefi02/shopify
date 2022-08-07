import { NextApiRequest, NextApiResponse } from 'next';

import { setDiscountCode } from '../../../controllers/cart';

import connectToDb from '../../../utils/coonectToDb';

const discountCode = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "POST") setDiscountCode(req,res)
    else res.status(400).send({error:"this is a bad request"})

}



export default discountCode