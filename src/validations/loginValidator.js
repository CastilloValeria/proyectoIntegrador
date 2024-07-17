const {body} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require("../database/models")

loginValidator= [
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isEmail().withMessage("El valor ingresado debe tener el formato de un correo electronico").bail()
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
            if (!user) {
                return Promise.reject('el email no esta registrado')
            }
        })
        .catch(() => {
            return Promise.reject('el mail no se encuentra registrado')
        })
    }),
        body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
            .custom((value, {req} )=> {
            return db.User.findOne({
                where: {
                email: req.body.email
            }
        })
        .then(user => {
            
            if (!bcrypt.compareSync(value, user.dataValues.password)) { //si no machea la contraseña
                return Promise.reject(' la contraseña es incorrecta');
            }
        })
        .catch(() => {
            return Promise.reject('Contraseña incorrecta');
        })
    })
];
module.exports=loginValidator;
//     body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
//     .custom((value, {req} )=> {
//         const user = req.session.user; 
//         console.log('esto es user ',user);
//         if (bcrypt.compareSync(value, user.password)) { 
    //             return Promise.reject('Contraseña incorrecta');
    //         }
    //     })
    // ]      