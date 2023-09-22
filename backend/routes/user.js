import express from "express"
import { getUser, addProfilePhoto } from "../controllers/user.js"
import tokenVerification from "../middlewares/tokenAuthentication.js"

const router = express.Router()

router.route("/:id").get(getUser)


export default router