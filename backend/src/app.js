import express from 'express';
import cors from 'cors';

const app = express();

// ✅ CORS Setup for frontend on localhost:5173
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


import userRouter from './routes/user.route.js';

app.use('/api/v1/users', userRouter);

export {app};