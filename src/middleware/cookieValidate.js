
const cookieValidate = (req,res,next) =>{
    if (req.cookies.rememberMe && req.cookies.user){
            req.session.user = req.cookies.user;
        }
        next();
    }

module.exports = cookieValidate;