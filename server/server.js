const express = require('express');
const userRouter = require('./router/user');
const todoRouter = require('./router/todo');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRouter);
app.use('/api/todos', todoRouter);
app.use('/uploads', express.static('uploads'))

app.listen(8000, () => {
    console.log("server is listening on port 8000");
});
