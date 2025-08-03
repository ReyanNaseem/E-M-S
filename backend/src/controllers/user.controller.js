import { User } from "../models/user.model.js";

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
        return res.status(201).json({
            data: req.body
        })
        // await User.create(req.body);

    } catch (error) {
        res.json({
            message: 'An error occur while registering user',
            error: error.message
        })
    }
}

export {
    registerUser
}