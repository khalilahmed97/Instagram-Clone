import User from "../models/User.js"
import bcrypt from "bcryptjs"
import cloudinary from "cloudinary"
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
    const {firstName, lastName, email, password, location} = req.body
    try{
        const userAlreadyExist = await User.findOne({email})
        if(userAlreadyExist){
            res.status(409).send("USER ALREADY EXISTS!")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // const cloud = await cloudinary.uploader.upload(profilePic)
        const newUserData = {
            firstName, lastName, email, password: hashedPassword, location
        }
        const newUser = await User.create(newUserData)
        res.status(200).send(newUser)
    }
    catch(error){
        res.status(400).send({message: error})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({message: "USER NOT EXIST!"})
        }
        const isPasswordMatch = bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            res.status(400).json({message: "INVALID PASSWORD!"})
        }
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY);
        res.status(200).json({token, user})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
}

export {createUser, loginUser}