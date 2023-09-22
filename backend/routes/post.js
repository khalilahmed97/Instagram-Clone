import express from "express"
import { createPost, getFeedPost, getUserPost } from "../controllers/post.js"
import protection from "../middlewares/tokenAuthentication.js"

const router = express.Router()


router.route("/", protection).get(getUserPost)
router.route("/all", protection).get(getFeedPost)

export default router