import jwt from 'jsonwebtoken';

const authMiddlewear = async(req, res, next)=>{
    try {
      const auth_token = req.headers.authorization || '';
      const [bearer, token] = auth_token.split(" ");

      if(!token){
        return res.status(401).json({
            message: 'Enter valid token'
        })
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if(!decodedToken){
        return res.status(401).json({
            message: 'Unauthorize Token'
        })
      }

      req.user = decodedToken;
      next();

    } catch (error) {
        res.status(404).json({
            message: 'Error occur in auth middlewear',
            error: error.message
        })
    }
}

export {authMiddlewear}