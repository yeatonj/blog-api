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
    }
    catch (err) {
        return err;
    }
}


module.exports = {
    createUser
}