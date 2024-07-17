const express = require('express');
const fs = require("fs")
const router = express.Router();
const {login,register,createUser,processlogin,logout,dashboard,formProfile,profileEdited,profile,destroy, imageProfile} = require("../controllers/userControllers");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const upload = require('../validations/uploadUser');
const sessionValidate = require("../middleware/sessionValidate");
const isAdmin = require("../middleware/isAdminValidate");


/* user login. */
router.get('/login', login);
router.post('/login',loginValidator, processlogin);
/* user register. */
router.get('/register', register);
router.post('/register', upload.single('image'),registerValidator,  createUser);
/* user logout. */
router.get('/logout', logout)
/* user dashboard. */
router.get('/dashboard',isAdmin,dashboard)
/* user profile. */
router.get("/userProfile/:id",sessionValidate,profile)
router.get("/profileEdit/:id", formProfile);
router.put('/profileEdit/:id', upload.single('image'), profileEdited)
router.delete('/delete/:id', destroy)
router.get('/imageProfile/:id',imageProfile)



module.exports = router;
