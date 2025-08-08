const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getAllPosts() {
    return await prisma.blogPost.findMany();
}

async function getAllPublishedPosts() {
    return await prisma.blogPost.findMany({
        where: {
            published: true,
        }
    });
}

async function createPost(authorId, title, content) {
    await prisma.blogPost.create({
        data: {
            authorId: authorId,
            title: title,
            content: content
        },
    });
}

async function deletePost(id) {
    await prisma.blogPost.delete({
        where: {
            id: id,
        },
    });
}

async function editPost(id, authorId, title, content, published) {
    await prisma.blogPost.update({
        where: {
            id: id,
        },
        data: {
            authorId: authorId,
            title: title,
            content: content,
            published: published
        },
    })
}

async function getPost(id) {
    const post = await prisma.blogPost.findFirst({
        where: {
            id: id,
        },
        include: {
            comments: true,
        }
    });
    return post;
}

async function createComment(blogId, userId, content) {
    await prisma.comment.create({
        data: {
            blogId: blogId,
            userId: userId,
            content: content
        }
    });
}

async function getCommentOwner(id) {
    const comment = prisma.comment.findFirst({
        where: {
            id: id,
        },
    });
    if (!comment) {
        return null;
    } else {
        return comment.userId;
    }
}

async function editComment(id, content, published) {
    await prisma.comment.update({
        where: {
            id: id,
        },
        data: {
            content: content,
            published: published
        }
    });
}

module.exports = {
    getAllPosts,
    getAllPublishedPosts,
    createPost,
    deletePost,
    editPost,
    getPost,
    createComment,
    getCommentOwner,
    editComment
}