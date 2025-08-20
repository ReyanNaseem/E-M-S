import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { Employee } from "../models/employee.model.js";

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

        return res.status(200).json({
            message: 'User register successfully',
            data: user
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

        const ispasswordValid = await bcrypt.compare(password, existUser.password)

        if(!ispasswordValid){
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign(
            {id: existUser._id},
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

const verifyUser = async(req, res)=>{
    try {
        const user = await User.findById(req.user)
        const employee = await Employee.countDocuments({user:req.user})

        return res.status(200).json({
            ...user.toObject(),
            total_emp: employee
        })


    } catch (error) {
        return res.status(500).json({
            message: "An error occur while verify user",
            error: error.message
        })
    }
}

const getAllUser = async(req, res)=>{
    try {
        const users = await User.find();
        return res.status(201).json({
            data: users,
            message: 'Fetch all users'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An error occur while geting users'
        })
    }
}

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.status(201).json({
      image: req.file.path, // ✅ renamed so frontend matches
    });
  } catch (error) {
    return res.status(500).json({
      message: "Image not uploaded",
      error: error.message,
    });
  }
};



export {
    registerUser,
    loginUser,
    verifyUser,
    getAllUser,
    uploadImage
}