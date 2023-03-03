const express = require('express');
const user_route = express.Router();
const body_parser = require('body-parser')


//use body parser for get data from form body
user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({ extended: true }));

//use multer for file upload
const multer = require('multer');
const path = require('path');

//define the static folder 
user_route.use(express.static('public'));

// use multer diskStorage for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userimages'), function (error, success) {
            if (error) throw error;
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '_' + path.extname(file.originalname) 
        cb(null, name, function (error1, success1) {
            if (error1) throw error1
        })
    }
});
//define uploaded storage path
const upload = multer({ storage: storage });

//define controller
const user_controller = require('../controller/UserController');
const auth = require('../middleware/auth')

//define url route
user_route.post('/register', upload.single('image'), user_controller.register_user);
user_route.post('/login', user_controller.user_login);
user_route.get('/test',auth, user_controller.test);

//update password route
//user_route.post('/update-password', auth, user_controller.update_password);

//forget password route
//user_route.post('/forget-password',user_controller.forget_password);

//user_route.get('/all-user', user_controller.home);

module.exports = user_route;