const Router = require('express')
const router = new Router()
const userController = require('../controllers/history.controller')

router.get('/', userController.get)
router.get('/action', userController.getById)
router.post('/create', userController.create)
 
module.exports = router