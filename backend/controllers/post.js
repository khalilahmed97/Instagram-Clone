import User from "../models/User.js";
import Post from "../models/Post.js"
import path from "path"
import cloudinary from "cloudinary"
const createPost = async (req, res) => {
   const url = req.protocol + "://" + req.get("host")
    try{
        let { data } = req.body;
        const uploadedFile = (req.file);
        console.log(uploadedFile)
        let {userID, description} = JSON.parse(data)
       
        const user = await User.findById(userID)
       if(user){
        const newPost = {
            userID,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            // userProfilePic: user.picturePath.url,
            picturePath: 'backend\' + uploadedFile.path',
            description: description,
            likes: {},
            comments: []
        }
        const post = await Post.create(newPost)
        res.status(200).send(post)
        
       }
      
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getUserPost = async (req, res) => {
    const {id} = req.params
    try{
        const post = await Post.findById({id})
        res.status(200).json(post)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
}

const getFeedPost = async (req, res) => {
    try{
        const post = await Post.find()
        res.status(200).send(post)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
    

}
const likePost = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.body

    try{

        const post = await Post.findById(id)
        const isLiked = post.likes.get(userID)
        if(isLiked){
            post.likes.delete(userID)
        }
        else{
            post.likes.set(userID, true)
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )
        res.status(200).json(updatedPost)

    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

export {createPost, getUserPost, getFeedPost, likePost}