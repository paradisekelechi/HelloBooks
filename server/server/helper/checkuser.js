
let checkUser = (req, res, next) => {
    
    //Check if usertype exists
    if(userType){
        console.log(userType);
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