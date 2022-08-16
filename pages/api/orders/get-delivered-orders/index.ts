import { NextApiRequest, NextApiResponse } from 'next';

import { getDeliveredOrders } from '../../../../controllers/orders';

import connectToDb from '../../../../utils/coonectToDb';
 

const handleOrders = async(req:NextApiRequest, res:NextApiResponse) => {

    await connectToDb()
    if(req.method === "GET") getDeliveredOrders(req,res)
    else res.status(400).send({error:"bad request"})

}

export default handleOrders;