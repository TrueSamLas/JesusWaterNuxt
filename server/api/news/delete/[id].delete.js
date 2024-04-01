import { getServerSession } from '#auth'
import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    if( session?.user?.role !== 'admin' )
        throw createError({
            statusCode: 403,
            message: 'Доступ ограничен',
        });

    const id = Number(
        getRouterParam(event, 'id')
    );

    const newsitem = await prisma.news.delete({
        where: { id },
    })

    if (newsitem)
        return true;

    return false;
})