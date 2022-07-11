import { NextApiRequest, NextApiResponse } from 'next';

import { signUp } from '../../../controllers/user';

import connectToDb from '../../../utils/coonectToDb';


const registerHandler = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "POST")signUp(req,res);
    else res.status(400).send({error:"this is a bad request"})

}

export default registerHandler;