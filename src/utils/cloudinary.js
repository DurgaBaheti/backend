//  useful for other projects toooo.............
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const uploadOnCloudinary = async (localeFilePath) => {
    try {
        if(!localeFilePath) return null;
        const response = await cloudinary.uploader.upload(localeFilePath, {
            resource_type: "auto"
        })
        console.log("file has been uploaded on cloudinary successfully");
        response.url;
        console.log(response);
        return response.url;
    } catch (error) {
        fs.unlinkSync(localeFilePath);
        return null;
    }
}
export {uploadOnCloudinary};
