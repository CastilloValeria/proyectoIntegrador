const express = require('express');
const path = require('path');
const router = express.Router();
const isAdmin = require("../middleware/isAdminValidate");
const multer = require('multer');
const {products,cart,productofertas,productDetail, productCart,formCreate,dashboard,create,editProduct,formEdit,destroy} = require("../controllers/productControllers")
const sessionValidate = require("../middleware/sessionValidate");
const search=require("../controllers/searchController")
const formatosAdmitidos = ['image/jpeg', 'image/png', 'image/gif','image/jpg','image/webp'];
const productValidator = require("../validations/productValidation");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../../public/img/products'))
    },
    filename: (req,file,cb) =>{
    let newFile = "image-"+ Date.now()+ path.extname(file.originalname);
    cb(null,newFile)
    }
})

// const fileFilter = (req, file, cb) => {
//     const extension = path.extname(file.originalname).toLowerCase();
//     try{
//       if (formatosAdmitidos.includes(extension)) {
//       cb(null, true);
//     } else {
//       cb( new Error('Formato de archivo no válido'), false);
//     }}
//     catch(Error){
//         console.log(Error)
//     }
//   }

const upLoad = multer({storage});
// const upLoad2 = multer({storage});
router
.get('/productDetail/:id', productDetail)
.get('/', products,search)
.get('/oferta', productofertas)
.get('/productCart',sessionValidate, cart)
// .get('/productCart/:id',sessionValidate, productCart)
.get('/dashboard', isAdmin,dashboard)
.get('/createProduct',isAdmin, formCreate)
.post('/createProduct', upLoad.array("image",5),isAdmin,productValidator, create)
.delete('/delete/:id', destroy)
.get('/editProduct/:id',formEdit)
.put('/editProduct/:id', upLoad.array('image',5),editProduct)



module.exports = router