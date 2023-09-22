import express from "express"
import dotenv from "dotenv"
import multer from "multer"
import postRoutes from "./routes/post.js"
import connectionToDB from "./config/connectionToDB.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import cloudinaryConfig from "./config/cloudinaryConfig.js"
import tokenVerification from "./middlewares/tokenAuthentication.js"
import { addProfilePhoto } from "./controllers/user.js"
import { createPost } from "./controllers/post.js"
import cors from "cors"

// CONNECTONS
cors({
    origin: "http://localhost:5173",
    credentials:true,
    methods:["GET", "POST"]
})
dotenv.config()

connectionToDB()
cloudinaryConfig()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
    },
    filename: (req, file, cb) =>{
        cb(null, Math.ceil(((Math.random() *10) + 10))+ '_' +file.originalname)

    }
   
})

const upload = multer({storage: storage})
// MIDDLEWARES
const app = express()
app.use(express.json({limit:"2000kb"}))
app.use(cors())

// ROUTES WITH IMAGES

app.post("/api/user/:id/updateProfilePhoto",upload.single("file"), tokenVerification, addProfilePhoto)
app.post("/api/user/post/new",tokenVerification,upload.single("file"), createPost)

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/user/post", postRoutes)
app.use("/api/user", userRoutes)

// RUNNING PORT
app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`)
})
