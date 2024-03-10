import prisma from '~/server/prisma'
import { createHash } from 'crypto'

export default defineEventHandler(async e => {
    const { login, password, name } = await readBody(e);

    const user = await prisma.user.create({
        data: {
            name,
            login,
            password: createHash('sha256').update(password).digest('base64'),
        },
    });

    if (!!user) {
        return {success: true}
    }

    return {success: false}
})