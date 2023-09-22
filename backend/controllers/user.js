import User from "../models/User.js"
import cloudinary from "cloudinary"
const getUser = async (req, res) => {

    const {id} = req.params
    try{

        const user = await User.findById(id);
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

}

const addProfilePhoto = async (req, res) => {

    const {id} = req.params
    const {profilePhoto} = req.body
    try{
        const cloud = await cloudinary.uploader.upload(profilePhoto)
        const user = await User.findByIdAndUpdate(id, {profilePic: {
            public_id: cloud.public_id,
            url: cloud.secure_url,
        }});
        
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

}

export {getUser, addProfilePhoto}