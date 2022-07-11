import { NextApiRequest, NextApiResponse } from 'next';

import { savedItemHandler } from '../../../controllers/savedItems';

import connectToDb from '../../../utils/coonectToDb';

const saveItem = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "POST") savedItemHandler(req,res,"save")
    else res.status(400).send({error:"this is a bad request"})

}



export default saveItem