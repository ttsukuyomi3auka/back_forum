const PostModel = require('../models/post')
const UserModel = require('../models/user')
const AreaModel = require('../models/area')
const CommentModel = require('../models/comment')
const { Roles, ViewStatus } = require('../models/enum')


async function createComment(req, res) {
    try {
        const { data, postId } = req.body;
        const authorId = req.userData.id;

        if (!data || !postId) {
            return res.status(400).send("Missing required fields");
        }

        const author = await UserModel.findById(authorId);
        if (!author) {
            return res.status(400).send("Author not found");
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(400).send("Post not found");
        }

        const newComment = new CommentModel({
            data,
            author: authorId,
            post: postId,
        });

        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        author.comments.push(newComment._id);
        await author.save();

        return res.status(201).send("Comment added");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

async function getPostComments(req, res) {
    try {
        const postId = req.params.id;

        if (!postId) {
            return res.status(400).send("Post ID is required");
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const comments = await CommentModel.find({ post: postId, status: ViewStatus.APPROVED }).populate('author', 'username');

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}
async function getAllNonApprovedComments(req, res) {
    try {
        const nonApprovedComments = await CommentModel.find({ status: ViewStatus.PENDING }).populate('author', 'username');
        return res.status(200).send(nonApprovedComments);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}
async function rejectComment(req, res) {
    try {
        const commentId = req.params.id;

        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        comment.status = ViewStatus.REJECTED;
        await comment.save();

        return res.status(201).send("Comment rejected");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

async function approveComment(req, res) {
    try {
        const commentId = req.params.id;

        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        comment.status = ViewStatus.APPROVED;
        await comment.save();

        return res.status(201).send("Comment approved");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

module.exports = {
    createComment,
    getPostComments,
    getAllNonApprovedComments,
    approveComment,
    rejectComment,
}