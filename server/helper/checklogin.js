import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const config = dotenv.config();

let checkLogin = (req, res, next) => {
    
    const token = req.body.token || req.headers['user-token'];

    //Check if token is sent
    if(token){
        jwt.verify (
            token, config.parsed.SECRET, (error, decoded) => {
                if(error){
                    res.status(403).send({
                        success: false,
                        message: 'Oops, user authentication failed!'
                    });
                    return;
                    next();
                }else{
                    req.userType = decoded.usertype;
                    req.accountType = decoded.accounttype;
                    req.email = decoded.email;
                    req.username = decoded.username;
                    return next();
                }
            }
        );
    }else{
        return res.status(412).send({
            success: false,
            message: 'User token is not provided'
        });
    }
}

export default checkLogin;