import { NextApiRequest, NextApiResponse } from "next";

import  jwt  from 'jsonwebtoken';

import Users from '../models/userModal';

import { IdecodedToken } from "../interfaces/decodedTokenInterface";

const savedItemHandler = async(req:NextApiRequest, res:NextApiResponse, apiRoute:string) => {
       try {
        const token:string = <string>req.headers["x-auth-token"]
        const { id } = req.query
        const decoded:IdecodedToken = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!);
        const user = await Users.findById(decoded._id)
        if(apiRoute === "save"){
            await user.saveItem(id)
            res.status(200).send("ok save")  
        }else{
            await user.removeSaveItem(id)
            res.status(200).send("ok hazf save")
        }
       } catch (error) {
        res.status(400).send({error})
       }
}

export {savedItemHandler}