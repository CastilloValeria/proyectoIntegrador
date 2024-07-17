const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {userList,detail, imageProfile, destroy,create,userEdit} = require('../../controllers/api/apiUserController');
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


router.get('/',userList);
router.get('/detail/:id',detail)
router.get('/imageProfile/:id',imageProfile)
router.post('/create',create);
router.put('/userEdit/:id',userEdit)
router.delete('/delete/:id',destroy)


module.exports = router