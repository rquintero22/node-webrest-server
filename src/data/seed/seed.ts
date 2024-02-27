import { UserEntity } from "../../domain";
import { prisma } from "../postgres"
import { seedData } from "./data";

(async() => {
    await main();
})();

const randomBetweenBAndX = ( x: number ) =>  {
    return Math.floor(Math.random() * 5);
}

async function main() {
    await Promise.all([
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
        prisma.user.deleteMany(),
    ]);

    const usersInsert= await prisma.user.createMany({data: seedData.users});
    const users = await prisma.user.findMany();
    
    const categoriesInsert = await prisma.category.createMany({
        data: seedData.categories.map(category => {
            return {...category, userId: users[0].id}
        })
    });

    const categories = await prisma.category.findMany();

    const productsInsert = await prisma.product.createMany({
        data: seedData.products.map(product => {
            return {
                ...product,
                userId: users[randomBetweenBAndX(seedData.users.length -1)].id,
                categoryId: categories[randomBetweenBAndX(seedData.categories.length -1) ].id
            };
        })
    });

    console.log('SEEDED');
}