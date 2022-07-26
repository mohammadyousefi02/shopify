import  bcrypt  from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../models/userModal';


const logIn = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const {email,password} = req.body
        let user = await Users.findOne({ email });
        if (!user) return res.status(400).send({error: 'شما هیچ دسترسی ای به این بخش ندارید'});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({error:'شما هیچ دسترسی ای به این بخش ندارید'});

        if(!user.isAdmin) return res.status(400).send({error:'شما هیچ دسترسی ای به این بخش ندارید'});
        
        const token = user.generateAuthToken();
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({error})
    }
}

export { logIn }