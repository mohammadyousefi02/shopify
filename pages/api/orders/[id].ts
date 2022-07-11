import { NextApiResponse, NextApiRequest  } from 'next';

import { getOrder } from '../../../controllers/orders';

import connectToDb from '../../../utils/coonectToDb';


const getOrderHandler = async(req:NextApiRequest, res:NextApiResponse) => {

    await connectToDb()
    if(req.method === "GET") getOrder(req,res)
    else res.status(400).send({error:"bad request"})

}

export default getOrderHandler