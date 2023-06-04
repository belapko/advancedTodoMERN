const prisma = require('../prisma/prisma');
const jwt = require('jsonwebtoken');
const {ApiError} = require("../middlewares/error");


exports.register = async (req, res, next) => {
    try {
        const {name, phone, code} = req.body;
        if (code !== '0000') {
            return next(ApiError.BadRequest('Неверный код подтверждения'));
        }
        const userExists = await prisma.user.findFirst({
            where: {
                phone_number: phone
            }
        });
        if (userExists) {
            return next(ApiError.BadRequest('Пользователь с таким номером уже существует'));
        }
        const user = await prisma.user.create({
            data: {
                name,
                photo: process.env.STATIC + phone,
                phone_number: phone
            }
        });
        return res.json({
            ...user,
            token: jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        });
    } catch (e) {
        next(e);
    }
}

exports.exist = async (req, res, next) => {
    try {
        const {phone} = req.body;
        const user = await prisma.user.findFirst({
            where: {
                phone_number: phone
            }
        });
        if (user) {
            return res.status(200).json();
        } else {
            return next(ApiError.BadRequest('Пользователя не существует'));
        }
    } catch (e) {
        next(e);
    }
}

exports.login = async (req, res, next) => {
    try {
        const {phone, code} = req.body;
        if (code !== '0000') {
            return next(ApiError.BadRequest('Неверный код подтверждения'));
        }
        const user = await prisma.user.findFirst({
            where: {
                phone_number: phone
            }
        });
        if (!user) {
            return next(ApiError.BadRequest('Пользователь с таким номером не существует'));
        }
        return res.json({
            ...user,
            token: jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        });
    } catch (e) {
        next(e);
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const {uid} = req.headers;
        const user = await prisma.user.findFirst({
            where: {
                id: uid
            }
        });
        return res.json(user);
    } catch (e) {
        next(e);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (e) {
        next(e);
    }
}

exports.patchMe = async (req, res, next) => {
    try {
        const {uid} = req.headers;
        const {name} = req.body;
        const user = await prisma.user.update({
            where: {
                id: uid,
            },
            data: {
                name,
            }
        });
        return res.json(user);
    } catch (e) {
        next(e);
    }
}