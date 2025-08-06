const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function allPosts() {
    return await prisma.blogPost.findMany();
}

async function allPublishedPosts() {
    return await prisma.blogPost.findMany({
        where: {
            published: true,
        }
    });
}

module.exports = {
    allPosts,
    allPublishedPosts
}