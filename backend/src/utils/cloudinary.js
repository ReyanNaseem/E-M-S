import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'EMS',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // ✅ fixed
    },
});

export { cloudinary, storage };
