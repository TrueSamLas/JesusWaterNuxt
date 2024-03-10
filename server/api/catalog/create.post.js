import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // console.log(body)

    const catalogitem = await prisma.catalog.create({
        data: {
            name: body.form.name,
            price: Number(body.form.price),
            image: body.form.image
        },
    });

    if (catalogitem)
        return true;

    return false;
})