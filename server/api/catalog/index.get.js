import prisma from '~/server/prisma'

export default defineEventHandler(async (event) => {
    const catalog = await prisma.catalog.findMany()

    // console.log(catalog)

    return catalog;
    
    // return [
    //     { Name: "Jesussy", Price: 100, Image: "https://www.icegif.com/wp-content/uploads/icegif-6302.gif" },
    //     { Name: "Vodka", Price: 500, Image: "https://media1.tenor.com/m/3NBIXb4SaC4AAAAC/bear.gif" },
    //     { Name: "Amongus", Price: 69, Image: "https://i.makeagif.com/media/10-04-2022/Kt8qPi.gif" }
    // ]
})