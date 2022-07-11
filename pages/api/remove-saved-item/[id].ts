import { NextApiResponse, NextApiRequest } from 'next';

import { savedItemHandler } from '../../../controllers/savedItemsController';

import connectToDb from '../../../utils/coonectToDb';


const removeSaveItem = async(req:NextApiRequest, res:NextApiResponse) => {

    await connectToDb()
    if(req.method === "POST") savedItemHandler(req,res,"decrease")
    else res.status(400).send({error:"this is a bad request"})

}

export default removeSaveItem