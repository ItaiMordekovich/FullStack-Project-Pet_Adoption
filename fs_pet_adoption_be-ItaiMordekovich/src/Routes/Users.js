const express = require('express')
const router = express.Router()
const UsersController = require('../Controllers/users.controller')
const auth = require('../Constants/auth')

router.post('/SignUp', UsersController.createUser)
router.post('/Login', UsersController.authUser)
router.get('/:Id',  UsersController.getUser)
router.put('/:Id', auth.authenticateToken, UsersController.changeUserDetails)
router.get('/', auth.authenticateToken,  UsersController.getAllUsers) 
module.exports = router
