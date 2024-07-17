const session = require("express-session");

const isAdminValidate = (req,res,next) => {
    if (req.session.user && req.session.user.rol_id == 1) {
        next();
    }else{
        res.redirect("/")
    }

}

module.exports = isAdminValidate;
