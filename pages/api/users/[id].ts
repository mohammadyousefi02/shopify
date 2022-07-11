import { NextApiRequest, NextApiResponse } from 'next';

import { getOneUser } from '../../../controllers/user';

import connectToDb from '../../../utils/coonectToDb';


const getOneUserHandler = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "GET")getOneUser(req,res)
    else res.status(400).send({error:"this is a bad request"})

}

export default getOneUserHandler;