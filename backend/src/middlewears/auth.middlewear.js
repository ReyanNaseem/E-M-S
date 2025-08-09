import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace('Bearer ', "");

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token in middleware:", decodedToken);

    const user = await User.findById(decodedToken?.id).select('-password')
    console.log(user);
    if(!user){
      return res.status(401).json({
        message: 'Invalid token'
      })
    }
    console.log("Auth Header:", req.header("Authorization"));
console.log("Decoded token:", decodedToken);
console.log("ID from token:", decodedToken?.id);

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};


export {authMiddleware}