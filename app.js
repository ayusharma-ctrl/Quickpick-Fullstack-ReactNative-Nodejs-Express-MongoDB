import express from 'express'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'
import orderRouter from './routes/order.js'
import fileUpload from 'express-fileupload';
import cors from 'cors'


//creating app, will listen this server inside server.js
export const app = express();


//----> using middlewares

//use this to read the json data that we'll be sending while making POST, PUT requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
    useTempFiles: true
}))
app.use(cors());


//---> using routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);


app.get('/',(req,res)=>{
    res.send("Welcome to QuickPick")
})
