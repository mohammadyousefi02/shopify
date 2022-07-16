import { NextApiResponse, NextApiRequest  } from 'next';

import { changeDeliveryStatus } from '../../../../controllers/orders';

import connectToDb from '../../../../utils/coonectToDb';


const orderHandler = async(req:NextApiRequest, res:NextApiResponse) => {

    await connectToDb()
    if(req.method === "POST") changeDeliveryStatus(req,res)
    else res.status(400).send({error:"bad request"})

}

export default orderHandler