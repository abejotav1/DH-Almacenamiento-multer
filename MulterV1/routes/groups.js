const express = require('express');
const router = express.Router();
const multer =require('multer');
const path = require('path');
const { body }=require('express-validator')
const controller = require('../controllers/groupsController');

//validaciones
const validateCreateForm = [
    body('name').notEmpty().withMessage('Debes de completar el campo de nombre'),
    body('last_name').notEmpty().withMessage('Debes de completar el campo de apellido'),
    body('email').isEmail().withMessage('Debes de completar un email valido')
]

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,'../public/img/groups'))
    },
    filename:(req,file,cb)=>{
        console.log(file);
        const newFilename = 'group-'+Date.now()+path.extname(file.originalname);
        cb(null, newFilename);
    }
})

const upload = multer({storage})

// Todos los grupos
router.get('/', controller.index);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
//router.post('/', upload.single('group-image'),controller.store);
router.post('/', validateCreateForm ,controller.store);

// Detalle de un grupo
router.get('/:id', controller.show);

module.exports = router;