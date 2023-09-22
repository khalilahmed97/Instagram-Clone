import jwt from "jsonwebtoken"

const tokenVerification = (req, res, next) => {
    try{
        let token = req.header("Authorization")
        if(!token){
            res.status(403).json({message: "ACCESS DENIED"})
        }
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]
            const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = verifiedUser
            next()
        }
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

export default tokenVerification