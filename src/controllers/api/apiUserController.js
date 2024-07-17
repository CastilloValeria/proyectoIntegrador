const { validationResult } = require("express-validator");
const db = require("../../database/models");
const fs = require('fs');
const path = require('path')
const bcrypt = require("bcrypt");

const apiUserController = {
create: async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        res.send({ errors: errors.mapped(), old: req.body });
    } else {
        const { nombre, email, age,password } = req.body;
        console.log("ESTO ES BODY",req.body);
        const userCreate = await db.User.create(  {
            username: nombre,
            email,
            birthday: age,
            genre: null,
            rol_id: null,
            avatar: req.file ? req.file.filename : null,
            password: bcrypt.hashSync(password, 10),
    })
    return res.status(200).json(userCreate)
    }
    } catch (error) {
res.status(400).send(error.message)
    }
},
userEdit:async(req,res)=>{
    try {
        const { id } = req.params;
        const {
            nombre,
            email,
            direction,
            number,
            phone,
            genre,
            rol,
            age,
            avatar,
        } = req.body;

        const user = await db.User.findByPk(id);
        const updateuser = await user.update({
            username: nombre,
            email,
            direction,
            number,
            phone,
            birthday: age,
            genre,
            rol_id: rol,
            avatar: req.file ? req.file.filename : avatar,
            updatedAt: new Date(),
        });
            return res.status(200).json(updateuser)
    } catch (err) {
        console.error(err);
    }

},
userList: async (req,res)=>{
 try {
const allUsers = await db.User.findAll()
const count = await db.User.count()
const userView = allUsers.map((user) =>{
    return{
        id: user.id,
        name:user.username,
        email: user.email,
        imagen: user.avatar,
        detail:`/apiUser/detail/${user.id}`
    }})
return res.status(200).json({count,users:userView})
 } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
 }
},
detail: async(req,res)=>{
    try {
const {id} = req.params;
const userDetail = await db.User.findByPk(id,{
    attributes:{
        exclude:['password','rol_id','avatar',]
    }
});
return res.status(200).json({userDetail,imageURL: `http://localhost:3000/users/imageProfile/${id}`})
    } catch (error) {
        res.status(400).send(error.message)
    }
},
imageProfile: async(req,res)=>{
    const {id} = req.params;
    const imageProfile = await db.User.findByPk(id,{
        attributes:['avatar']
    })
    return res.status(200).json(imageProfile)
},
destroy: async (req, res) => {
    const id = parseInt( req.params.id);
        try {
            if(!Number.isInteger(id)){
                throw new Error(`El ID:${id} no es un numero valido,ingrese un numero entero por favor`)
            }
                const userFind = await db.User.findOne({
                where: {id },
                });
                if (userFind.avatar) {
        
                    fs.unlink(
                        path.join(__dirname, `../../../public/img/users/${userFind.avatar}`),
                        (err) => {
                            if (err) throw err;
                        }
                        );
                        await db.User.destroy({
                        where: { id },
                        })
                        res.status(200).send("El producto ID fue eliminado");
                    }else{
                    throw new Error(`El ID:${id} no corresponde a un producto existente`)
                    }
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
}

module.exports = apiUserController