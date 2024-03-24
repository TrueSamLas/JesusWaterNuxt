import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const id = Number(
        getRouterParam(event, 'id')
    );

    const catalogitem = await prisma.catalog.findUnique({
        where: { id },
    });

    return catalogitem;
})