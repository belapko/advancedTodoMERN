const {Router} = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const {uploadMiddleware} = require('../middlewares/upload');

const router = new Router();

router.post('/register', uploadMiddleware, userController.register);
router.post('/exist', userController.exist)
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.getMe);
router.get('/users', authMiddleware, userController.getUsers);
router.patch('/me', authMiddleware, uploadMiddleware, userController.patchMe);

module.exports = router;