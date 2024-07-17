const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'/../../public/images/users'))
      },
      filename: (req, file, cb) => {
        const idImage= Date.now() + '-' + uuidv4();
        cb(null, file.originalname + '-' + idImage + path.extname(file.originalname))
      }
});

const fileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/)){
        req.fileValidationError ="el archivo subido no tiene el formato correcto"
        return cb(null,false,req.fileValidationError)
    }
    return cb(null,true)
}

module.exports = multer({storage,fileFilter})