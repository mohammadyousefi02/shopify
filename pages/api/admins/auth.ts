import { NextApiRequest, NextApiResponse } from 'next';

import { logIn } from '../../../controllers/admin';

import connectToDb from '../../../utils/coonectToDb';


const logInHadnler = async(req:NextApiRequest,res:NextApiResponse)=>{

    await connectToDb()
    if(req.method === "POST")logIn(req,res)
    else res.status(400).send({error:"this is a bad request"})

}

export default logInHadnler;