const {body} = require('express-validator');
const  db = require('../database/models'); 


module.exports = [
    body('nombre').notEmpty().withMessage("El campo no puede estar vacío"),
    body('email').notEmpty().withMessage("El campo no puede estar vacío")
    .isEmail().withMessage('Debe ser un correo con formato válido')
    .isEmail().withMessage('*Debe ser un correo con formato valido*').bail()
    .custom((value,{req} )=> { 
        // console.log("esto es value",value)
        // console.log("esto es body",req.body.email);
        return db.User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
        // console.log("esto es user----",user)
            if (user) {
                return Promise.reject('El email se encuentra registrado')
            }
        })
        .catch(() => {
            return Promise.reject('El email se encuentra registrado')
        })
}),



    body('password').notEmpty().withMessage("*El campo no puede estar vacio*").bail()
    .custom((value,{req})=> {
        return value == req.body.password2;
    }).withMessage("*Los password no coinciden*"),





]