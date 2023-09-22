import express from 'express'
import {createUser, loginUser} from "../controllers/auth.js"
import protection from "../middlewares/tokenAuthentication.js"

const router = express.Router();

router.route("/login", protection).post(loginUser)
router.route("/register").post(createUser)
export default router