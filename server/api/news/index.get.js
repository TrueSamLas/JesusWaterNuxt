import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const news = await prisma.news.findMany()

    return news;
})