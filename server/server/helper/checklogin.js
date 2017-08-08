import jwt from 'jsonwebtoken';

let checkLogin = (req, res, next) => {
    //const authenticator = req.headers.authorization;
    const token = req.body.token || req.headers['user-token'];

    //Check if token is sent
    if(token){
        jwt.verify (
            token, 'Jm7MmG6YrssZemeHxG0h', (error, decoded) => {
                if(error){
                    res.status(403).send({
                        success: false,
                        message: 'Oops, user authentication failed!'
                    });
                }else{
                    let userType = decoded.usertype;
                    let accountType = decoded.accounttype;
                    next();
                }
            }
        );
    }else{
        res.status(412).send({
            success: false,
            message: 'User token is not provided'
        });
    }
}

export default checkLogin;