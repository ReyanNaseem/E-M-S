import { app } from "./app.js";
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{

    app.on("error",(error)=>{
        console.log("ERR: ",error);
        process.exit(1);
    })

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`app is running at PORT: ${process.env.PORT}`);
    })
    
})
.catch((err)=>{
    console.log("MONGO db connection failed !!", err)
})