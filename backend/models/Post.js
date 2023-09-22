import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    userProfilePic:{
        type:String,
        // required: true,
    },
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
  
    location: String,
    description: String,
    picturePath:{
        type:String,
        required: true,
    },
    likes:{
        type: Map,
        of: Boolean,
    },
    comments:{
        type: Array,
        default: [],
    }
},{
    timestamps: true
})

const Post = mongoose.model("Post",postSchema)
export default Post