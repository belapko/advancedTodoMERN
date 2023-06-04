const prisma = require('../prisma/prisma');

exports.createTodo = async (req, res, next) => {
    try {
        const {uid} = req.headers;
        const {text} = req.body;
        const todo = await prisma.todo.create({
            data: {
                text,
                userId: uid
            }
        });
        return res.json(todo);
    } catch (e) {
        next(e);
    }
}

exports.readTodo = async (req, res, next) => {
    try {
        const {uid} = req.headers;
        const todos = await prisma.todo.findMany({
            where: {
                userId: uid
            }
        });
        return res.json(todos);
    } catch (e) {
        next(e);
    }
}

exports.updateTodoData = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {text} = req.body;

        const todo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                text
            }
        });
        return res.json(todo);
    } catch (e) {
        next(e);
    }
}

exports.updateTodoHidden = async (req, res, next) => {
    try {
        const {id} = req.params;
        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });
        const updatedTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                hidden: !todo.hidden
            }
        });

        return res.json(updatedTodo);
    } catch (e) {
        next(e);
    }
}


exports.updateTodoCompleted = async (req, res, next) => {
    try {
        const {id} = req.params;
        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });
        const updatedTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                completed: !todo.completed
            }
        });

        return res.json(updatedTodo);
    } catch (e) {
        next(e);
    }
}
