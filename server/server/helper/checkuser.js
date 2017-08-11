
let checkUser = (req, res, next) => {
    console.log(req.userType);
    const userType = req.userType;
    console.log(userType);
    //Check if usertype exists
    if(userType){
        if(userType != 2){
            res.status(401).send({
                status: false,
                message: 'Oops! User not authorized'
            });
            return next();
        }else{
            req.userType = 'ADMIN';
            next();
        }
    }else{
        res.status(400).send({
            status: false,
            message: 'User type is not available'
        });
        return next();
    }
}

export default checkUser;