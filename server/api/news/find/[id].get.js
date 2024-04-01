import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const id = Number(
        getRouterParam(event, 'id')
    );

    const newsitem = await prisma.news.findUnique({
        where: { id },
    });

    return newsitem;
})