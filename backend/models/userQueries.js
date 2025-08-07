const { use } = require('passport');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function createUser(username, first, last, password) {
    try {
        await prisma.user.create({
            data: {
                username: username,
                first: first,
                last: last,
                password: password
            },
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function getUserFromUsername(username) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        },
    });
    return user;
}

async function getUserFromId(id) {
    const user = await prisma.user.findFirst({
        where: {
            id: id
        },
    });
    return user;
}


module.exports = {
    createUser,
    getUserFromId,
    getUserFromUsername
}