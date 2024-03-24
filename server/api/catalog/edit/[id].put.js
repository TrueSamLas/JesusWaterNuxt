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
    
    const body = await readBody(event);

    const catalogitem = await prisma.catalog.update({
        where: { id },
        data: {
            name: body.form.name,
            price: Number(body.form.price),
            image: body.form.image,
        },
    });

    if (catalogitem)
        return true;

    return false;
})