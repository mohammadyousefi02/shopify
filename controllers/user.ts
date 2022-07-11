import { NextApiRequest, NextApiResponse } from "next"

import bcrypt from "bcrypt"
import _ from "lodash"

import Users from "../models/userModal";


const signUp = async(req:NextApiRequest,res:NextApiResponse) => {
    try {
        const {username,email,password} = req.body;
        let user = await Users.findOne({ email });
        if (user) return res.status(400).send({error:'User already registered.'});
        let newUser = new Users({username,email,password,cart:{items:[]},saved:{items:[]},orders:[]})
        
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save()

        const token = newUser.generateAuthToken();
        res.status(201).json({token}) 
    } catch (error) {
        res.status(400).send({error})
    }
}

const logIn = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const {email,password} = req.body
        let user = await Users.findOne({ email });
        if (!user) return res.status(400).send({error:'Invalid email or password.'});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({error:'Invalid email or password.'});

        const token = user.generateAuthToken();
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({error})
    }
}

const getAllUsers = async(req:NextApiRequest,res:NextApiResponse)=>{
    try {
        let users = await Users.find().populate('cart.items.product').populate('saved.items.product')
        users = users.map(u=>_.pick(u,['username','email','_id','cart','saved','orders']))
        res.status(200).json(users)
    } catch (error) {
        res.status(400).send({error})
    }
}

const getOneUser = async(req:NextApiRequest,res:NextApiResponse) => {
    const {id} = req.query;
    try {
        const user = await Users.findById(id).populate('cart.items.product').populate('saved.items.product')
        if(user)res.status(200).json(_.pick(user,['username','email','_id','cart','saved','orders']))
        else res.status(404).send({error:"the user is not found"})
    } catch (error) {
        res.status(400).send({error})
    }
}

export { signUp, getAllUsers, getOneUser, logIn };