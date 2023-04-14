import mongoose from 'mongoose'
import { user_model } from '../models/users.models.js';
import "dotenv/config.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const UserModel = new mongoose.model("User", user_model);

const Users = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const FollowById = async (req, res) => {
    const { id } = req.params;
    const reqUserId = req.user;
    try {
        const followerUser = await UserModel.findById(id);
        if (!followerUser) {
            return res.status(401).json({ message: 'User id not found.' });
        }
        const reqUser = await UserModel.findById(reqUserId);
        if (followerUser.followers.findIndex((ele) => ele == reqUserId) != -1) {
            return res.status(200).json({ message: 'You already following this user' });
        }
        followerUser.followers.push(reqUserId);
        reqUser.following.push(followerUser._id);

        await reqUser.save();
        await followerUser.save();
        return res.status(200).json({ message: 'Now you started following this user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const UnfollowById = async (req, res) => {
    const { id } = req.params;
    const reqUserId = req.user;
    try {
        const followerUser = await UserModel.findById(id);
        if (!followerUser) {
            return res.status(401).json({ message: 'User id not found.' });
        }
        const reqUser = await UserModel.findById(reqUserId);
        followerUser.followers.pull(reqUserId);
        reqUser.following.pull(followerUser._id);

        await reqUser.save();
        await followerUser.save();
        return res.status(200).json({ message: 'Now you has unfollowed this user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const getUser = async (req, res) => {
    console.log("Getting Current User's Data")
    const reqUserId = req.user;
    try {
        const user = await UserModel.findById(reqUserId);
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        return res.status(200).json({
            name: user.name,
            totalfollowers: user.followers.length,
            totalfollowing: user.following.length
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}


export default Users;
export { FollowById, UnfollowById, getUser }