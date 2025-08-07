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


module.exports = {
    createUser
}