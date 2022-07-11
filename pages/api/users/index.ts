import { NextApiRequest, NextApiResponse } from 'next';

import { getAllUsers } from '../../../controllers/user';

import connectToDb from '../../../utils/coonectToDb';

const userHandler = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "GET") getAllUsers(req,res);
    else res.status(400).send({error:"this is a bad request for users endpoint"})

}

export default userHandler;