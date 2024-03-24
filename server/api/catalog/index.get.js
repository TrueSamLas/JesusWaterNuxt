import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const catalog = await prisma.catalog.findMany()

    return catalog;
})