import { getServerSession } from '#auth'
import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    if( session?.user?.role !== 'admin' )
        throw createError({
            statusCode: 403,
            message: 'Доступ ограничен',
        });

    const body = await readBody(event);

    const newsitem = await prisma.news.create({
        data: {
            title: body.form.title,
            image: body.form.image,
            text: body.form.text,
            date: Number(body.form.date),
        },
    });

    if (newsitem)
        return true;

    return false;
})