import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        min: 10,
        max:50
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max:50
    },
    location:{
        type: String,
        required: true,
    },
    profilePic:{
        public_id: String,
        url: {type: String, default:"profileIcon.png"},
       
    },
    friends:{
        type: Array,
        default: [],
    },
},
{timestamps: true})

const User = mongoose.model("User", UserSchema)

export default User