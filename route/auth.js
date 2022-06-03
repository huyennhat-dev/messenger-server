const authController = require('../controller/auth_controller');

const router = require('express').Router()

//register
router.post('/register', authController.register)

//login
router.post('/login', authController.login)

//get all auth
router.get('/allusers/:id', authController.getAllAuth)

//update a auth
router.put('/update/:id', authController.updateAuth)

module.exports = router;