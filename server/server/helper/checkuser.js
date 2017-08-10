
let checkUser = (req, res, next) => {
    
    const userType = req.userType;
    //Check if usertype exists
    if(userType){
        if(userType != 'ADMIN'){
            res.status(401).send({
                status: false,
                message: 'Oops! User not authorized'
            });
        }
    }else{
        res.status(400).send({
            status: false,
            message: 'User type is not available'
        });
    }
}

export default checkUser;