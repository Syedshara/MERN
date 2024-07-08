import User from '../models/user.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === "" ||
        password === "") {
        next(errorHandler(400, 'Fill  all the fields??'));
    }
    const hash_key = bcryptjs.hashSync(password, 10)

    const user = new User({
        username,
        email,
        password: hash_key
    })
    try {
        await user.save();
        res.status(200).json(user)

    }
    catch (err) {
        next(err);

    }


}

export const getUsers = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "User not Found"));
        }
        const check = bcryptjs.compareSync(password, validUser.password);
        if (!check) {
            return next(errorHandler(400, "Invalid Password"));
        }
        const token = jwt.sign({ userId: validUser._id }, process.env.SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json(rest);
    }
    catch (err) {
        next(err);
    }



}


export const google = async (req, res, next) => {
    const { name, email, photoURL } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET);
            const { password: pass, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }
        else {
            const generatePass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashed = bcryptjs.hashSync(generatePass, 10)
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashed,
                photoURL

            })
            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, process.env.SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);

        }
    }
    catch (err) {
        next(err)
    }
}