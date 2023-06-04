const {Router} = require("express");
const todoController = require('../controllers/todo');
const authMiddleware = require('../middlewares/auth');

const router = new Router();


router.post('/create', authMiddleware, todoController.createTodo);
router.get('/read', authMiddleware, todoController.readTodo);
router.patch('/update-data/:id', authMiddleware, todoController.updateTodoData);
router.patch('/update-hidden/:id', authMiddleware, todoController.updateTodoHidden);
router.patch('/update-completed/:id', authMiddleware, todoController.updateTodoCompleted);


module.exports = router;