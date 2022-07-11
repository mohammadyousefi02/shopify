import { NextApiRequest, NextApiResponse } from "next";

import connectToDb from "../../../utils/coonectToDb";

import { getAllProduct, createProduct } from "../../../controllers/product";


export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    await connectToDb()
    if(req.method === "GET")getAllProduct(req,res)
    else if(req.method === "POST")createProduct(req,res)
    else res.status(400).send({error:"this is a bad request"})

}