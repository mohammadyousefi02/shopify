import { NextApiRequest, NextApiResponse } from "next";

import connectToDb from "../../../utils/coonectToDb";

import { createCategory, getAllCategories } from "../../../controllers/category";



export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    await connectToDb()
    if(req.method === "GET")getAllCategories(req,res)
    else if(req.method === "POST")createCategory(req,res)
    else res.status(400).send({error:"this is a bad request"})

}