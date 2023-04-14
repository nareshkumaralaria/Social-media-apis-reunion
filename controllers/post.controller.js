import mongoose from 'mongoose'
import { post_model } from '../models/post.models.js';
import { user_model } from '../models/users.models.js';
import "dotenv/config.js";

const PostModel = new mongoose.model("Post", post_model);
const UserModel = new mongoose.model("User", user_model);

const addNewPost = async (req, res) => {
    const { title, description } = req.body;
    const reqUserId = req.user;
    try {
        const user = await UserModel.findById(reqUserId);
        const post = new PostModel({
            createdBy: reqUserId,
            title: title,
            description: description,
        });
        user.posts.push(post);
        await post.save();
        await user.save();
        return res.status(200).json({
            id: post._id,
            title: post.title,
            description: post.description,
            createdAt: new Date().toLocaleDateString()
        });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }
};

const deletePostById = async (req, res) => {
    const { id } = req.params;
    const reqUserId = req.user;
    try {
        const post = await PostModel.findByIdAndDelete(id);
        if (post == null) {
            return res.status(404).json({ message: "Post Id Invalid" });
        }
        const user = await UserModel.findById(reqUserId);
        user.posts.pull(post._id);
        await user.save();
        return res.status(200).json({ post_id: post._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }
}

const likePostById = async (req, res) => {
    const { id } = req.params;
    const reqUserId = req.user;
    try {
        const post = await PostModel.findById(id);
        if (post.likes.findIndex((ele) => ele == reqUserId) != -1) {
            return res.status(200).json({ message: 'You already liked this post' });
        } else if (post.unlikes.findIndex((ele) => ele == reqUserId) != -1) {
            post.unlikes.pull(reqUserId);
        }
        post.likes?.push(reqUserId);
        await post.save();
        return res.status(200).json({ message: `You liked the post` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }
}

const unlikePostById = async (req, res) => {
    const { id } = req.params;
    const reqUserId = req.user;
    try {
        const post = await PostModel.findById(id);
        if (post.likes.findIndex((ele) => ele == reqUserId) != -1) {
            post.likes.pull(reqUserId);
        }
        else if (post.unlikes.findIndex((ele) => ele == reqUserId) != -1) {
            return res.status(200).json({ message: 'You already disliked the post' });
        }
        post.unlikes?.push(reqUserId);
        await post.save();
        return res.status(200).json({ message: `You disliked the post` })
    } catch (error) {
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }
}

const addComment = async (req, res) => {
    const { id } = req.params;
    const reqUserId = req.user;
    const { comment } = req.body;
    try {
        const post = await PostModel.findById(id);
        const newComment = {
            _id: new mongoose.Types.ObjectId(),
            createdBy: reqUserId,
            text: comment,
        }
        await post.comments.push(newComment);
        await post.save();
        return res.status(200).json({ comment_id: newComment._id })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "No Post Found. Check Post Id" });
        }
        return res.status(200).json({
            id: post._id,
            title: post.title,
            totalLikes: post.likes.length,
            totalComments: post.comments.length
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }
}

const getAllPost = async (req, res) => {
    const reqUserId = req.user;
    try {
        const posts = await PostModel.find({ createdBy: reqUserId })
        if (!posts) {
            return res.status(404).json({ message: "No post found" });
        }
        let post = [];
        for (var i = 0; i < posts.length; ++i) {
            post.push({
                id: posts[i]._id,
                title: posts[i].title,
                description: posts[i].description,
                createdAt: posts[i].createdAt.toLocaleDateString(),
                comments: posts[i].comments,
                likes: posts[i].likes.length,
            });
        }
        return res.status(200).json({ allPosts: post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal server error. ${error}` });
    }

}

export default addNewPost;
export { deletePostById, likePostById, unlikePostById, addComment, getPostById, getAllPost }