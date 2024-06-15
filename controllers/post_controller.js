const PostModel = require('../models/post')
const UserModel = require('../models/user')
const AreaModel = require('../models/area')
const { Roles, ViewStatus } = require('../models/enum')


async function createPost(req, res) {
    try {
        const { title, description, areas } = req.body;

        if (!title || !description || !areas || !Array.isArray(areas) || areas.length === 0) {
            return res.status(400).send("Missing required fields or invalid format");
        }
        const authorId = req.userData.id

        const author = await UserModel.findById(authorId);
        if (!author) {
            return res.status(400).send("Author not found");
        }

        const validAreas = await AreaModel.find({ _id: { $in: areas } });
        if (validAreas.length !== areas.length) {
            return res.status(400).send("One or more areas not found");
        }

        const newPost = new PostModel({
            title,
            description,
            author: authorId,
            areas,
        });

        await newPost.save();

        author.posts.push(newPost._id);
        await author.save();

        return res.status(201).send("Post added");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }

}

async function updatePost(req, res) {
    try {
        const { postId, status, title, description, areas } = req.body;

        if (!postId) {
            return res.status(400).send("Post ID is required");
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const userId = req.userData.id;
        const userRole = req.userData.role;

        if (userRole === Roles.ADMIN || userRole === Roles.MODERATOR) {
            if (post.author.toString() === userId) {
                if (status && Object.values(ViewStatus).includes(status)) {
                    post.status = status;
                }
                if (title) {
                    post.title = title;
                }
                if (description) {
                    post.description = description;
                }
                if (areas && Array.isArray(areas)) {
                    const validAreas = await AreaModel.find({ _id: { $in: areas } });
                    if (validAreas.length !== areas.length) {
                        return res.status(400).send("One or more areas not found");
                    }
                    post.areas = areas;
                }
            } else {
                if (status && Object.values(ViewStatus).includes(status)) {
                    post.status = status;
                } else {
                    return res.status(400).send("Invalid status");
                }
            }
        } else {
            if (post.author.toString() === userId) {
                if (title) {
                    post.title = title;
                }
                if (description) {
                    post.description = description;
                }
                if (areas && Array.isArray(areas)) {
                    const validAreas = await AreaModel.find({ _id: { $in: areas } });
                    if (validAreas.length !== areas.length) {
                        return res.status(400).send("One or more areas not found");
                    }
                    post.areas = areas;
                }
            } else {
                return res.status(403).send("You are not allowed to edit this post");
            }
        }

        await post.save();
        return res.status(200).send(post);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

async function getApprovedPosts(req, res) {
    try {
        const approvedPosts = await PostModel.find({ status: ViewStatus.APPROVED });
        return res.status(200).send(approvedPosts);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

async function getAllNonApprovedPosts(req, res) {
    try {
        const nonApprovedPosts = await PostModel.find({ status: { $ne: ViewStatus.APPROVED } });
        return res.status(200).send(nonApprovedPosts);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

async function getPostById(req, res) {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(404).send("Post not found");
        }
        return res.send(post)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Iternal server error")
    }

}

async function deletePost(req, res) {
    try {
        const postId = req.params.id
        const userId = req.userData.id
        const userRole = req.userData.role;

        const post = await PostModel.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (post.author.toString() !== userId && userRole !== Roles.ADMIN) {
            return res.status(403).send("You dont have access");
        }

        await PostModel.findByIdAndDelete(postId);

        return res.status(200).send("Post deleted");

    } catch (error) {
        console.log(error)
        return res.status(500).send("Iternal server error")
    }
}
async function getUserPosts(req, res) {
    try {
        const userId = req.params.id;
        const posts = await PostModel.find({ author: userId })

        if (!posts) {
            return res.status(404).send("Posts not found for this user");
        }
        return res.send(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Iternal server error")
    }

}

module.exports = {
    createPost,
    updatePost,
    getApprovedPosts,
    getAllNonApprovedPosts,
    getPostById,
    deletePost,
    getUserPosts,

}