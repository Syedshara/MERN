import User from '../models/user.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
import { raw } from 'express';

export const getUser = (req, res) => {
    res.json({ "message": "success" });
}

export const updateUser = async (req, res, next) => {

    if (req.user.userId !== req.params.uId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password) {
        if (req.body.password.length < 8) {
            return next(errorHandler(400, 'Password must be at least 8 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 8 || req.body.username.length > 20) {
            return next(
                errorHandler(400, 'Username must be between 7 and 20 characters')
            );
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.uId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    photoURL: req.body.photoURL,
                    password: req.body.password,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {

    if (!req.user.isAdmin && req.user.userId != req.params.uId) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
    }

    try {
        await User.findByIdAndDelete(req.params.uId);
        res.status(200).json({ message: 'User deleted successfully!' });

    }
    catch (err) {
        next(err)
    }
}

export const signoutUser = (req, res, next) => {
    try {
        res.clearCookie('access_token')
            .status(200)
            .json(
                "Sign Out Successfully"
            )
    }
    catch (err) {
        next(err)
    }
}

export const getuser = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to get this user'));
    }
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0
        const direction = req.query.direction === 'asc' ? 1 : -1;
        const users = await User.find()
            .sort({ createdAt: direction })
            .skip(startIndex)
            .limit(limit);
        const userWithOutPass = users.map((user) => {
            const { password: pass, ...rest } = user._doc
            return rest
        })
        const TotalUser = await User.countDocuments()

        const now = new Date()
        const LastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const LastMonthUser = await User.countDocuments({
            createdAt: {
                $gte: LastMonth
            }
        })
        return res.status(200).json({
            userWithOutPass,
            TotalUser,
            LastMonthUser

        })

    }
    catch (err) {
        next(err)
    }
}

export const getuserc = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.userId
        )
        if (!user) {
            return next(errorHandler(404, 'User not found'))
        }
        const { password: pass, ...rest } = user._doc
        return res.status(200).json(rest)
    }
    catch (err) {
        next(err)
    }


}
