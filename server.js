import { app } from './app.js'
import { mongoDB } from './database/database.js';
import { config } from 'dotenv';
import cloudinary from 'cloudinary';

//---> setting up .env file by importing config from dotenv
//Note: we are not giving path as this file is in root directory. So we can directly call this
//if in different folder then give path as config({path:'./folderName/config.env'}) 
config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET, 
})

//calling this func to connect the database
mongoDB();


//using this to start the server, server will listen/handles all the requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`);
})