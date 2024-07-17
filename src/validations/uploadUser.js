const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img/users'))
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, path.basename(file.originalname,path.extname(file.originalname)) + '-' + uniqueSuffix + path.extname(file.originalname))
      }
      
});
const fileFilter = (req,file,cb)=>{
  if(!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/)){
      req.fileValidationError ="el archivo subido no tiene el formato correcto"
      return cb(null,false)
  }
  return cb(null,true)
}


module.exports = multer({storage,fileFilter})