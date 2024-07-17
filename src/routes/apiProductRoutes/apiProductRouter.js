const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {products,productDetail,create,editProduct,destroy,addCart} = require("../../controllers/api/apiProductController")
const formatosAdmitidos = ['image/jpeg', 'image/png', 'image/gif','image/jpg','image/webp'];

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../../../public/img/products'))
    },
    filename: (req,file,cb) =>{
    let newFile = "image-"+ Date.now()+ path.extname(file.originalname);
    cb(null,newFile)
    }
})

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    try{if (formatosAdmitidos.includes(extension)) {
      cb(null, true);
    } else {
      cb( new Error('Formato de archivo no válido'), false);
    }}
    catch(Error){
        console.log(Error)
    }
  }

const upLoad = multer({storage,fileFilter});
// const upLoad2 = multer({storage});
router
.get('/detail/:id', productDetail)
.get('/', products)

.post('/create', upLoad.array("image",4), create)
.post('/addCart', addCart)

.put('/edit/:id', upLoad.array('image',4),editProduct)

.delete('/delete/:id', destroy)



module.exports = router