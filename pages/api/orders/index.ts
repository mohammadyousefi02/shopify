import { NextApiRequest, NextApiResponse } from 'next';

import { getAllOrders, sendOrders } from '../../../controllers/orders';

import connectToDb from '../../../utils/coonectToDb';
 

const handleOrders = async(req:NextApiRequest, res:NextApiResponse) => {

    await connectToDb()
    if(req.method === "GET") getAllOrders(req,res)
    else if(req.method === "POST") sendOrders(req,res)
    else res.status(400).send({error:"bad request"})

}

export default handleOrders;