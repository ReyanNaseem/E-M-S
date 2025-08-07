import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const registerUser = async( req, res )=>{
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(401).json({
                message: 'Required field is missing'
            })
        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(409).json({
                message: 'User already exist'
            })
        }
        // return res.status(201).json({
        //     data: req.body
        // })
        const user = await User.create(req.body);

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        return res.status(200).json({
            message: 'User register successfully',
            data: user,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: 'An error occur while registering user',
            error: error.message
        })
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                message: 'required field is missing'
            })
        }

        const existUser = await User.findOne({email});

        if(!existUser){
            return res.status(401).json({
                message: 'User does not exist'
            })
        }

        const user = await bcrypt.compare(password, existUser.password)

        if(!user){
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        return res.status(200).json({
            message: 'User Login Successfully',
            token
        })

    } catch (error) {
        res.status(500).json({
            message: 'An error occur while login user',
            error: error.message
        })
    }
}

export {
    registerUser,
    loginUser
}