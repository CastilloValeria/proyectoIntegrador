const {body} = require('express-validator');
const  db = require('../database/models'); 


module.exports = [
    body('titulo').notEmpty().withMessage("El campo no puede estar vacío").isLength({ min: 5 }).withMessage('El titulo debe tener al menos 5 caracteres'),
    body('description').notEmpty().withMessage("El campo no puede estar vacío").isLength({ min: 20 }).withMessage('La descripcion debe tener al menos 20 caracteres'),
    body('brand').notEmpty().withMessage("El campo no puede estar vacío").isLength({ min: 5 }).withMessage('la marca debe tener al menos 5 caracteres'),
    body('price').notEmpty().withMessage("El campo no puede estar vacío").isLength({ min: 5 }).withMessage('El precio debe tener al menos 4 carateres(numeros)'),
    // body('image').exists().withMessage('El campo "imagen" es obligatorio')
    // .custom((value, { req }) => {
    //     const file = req.file;  // Use req.file for single file upload

    //     if (!file) {
    //         throw new Error('No se ha seleccionado un archivo');
    //     }

    //     const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    //     const extension = file.originalname.split('.').pop().toLowerCase();
    //     if (!allowedExtensions.includes(extension)) {
    //         throw new Error('Formato de archivo no válido');
    //     }

    //     return true;
    // })
]