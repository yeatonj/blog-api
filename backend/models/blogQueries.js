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

async function createPost() {

}

async function deletePost() {

}

async function editPost() {

}

async function getPost() {

}

module.exports = {
    getAllPosts,
    getAllPublishedPosts,
    createPost,
    deletePost,
    editPost,
    getPost
}