import { retrieveCategory, retrieveProduct } from "./retriever.js";
import { categoryObj, productObj } from "./interface.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// function to insert single category object into Category table
const insertCategory = async (categoryObjectId: number, categoryName: string) => {
    await prisma.category.create({
        data: {
            id: categoryObjectId,
            name: categoryName
        }
    });
};


// function to insert single product object into Product table
const insertProduct = async (productObject: productObj, categoryId: number) => {
    await prisma.product.create({
        data: {
            id: productObject.id,
            title: productObject.title,
            categoryId: categoryId,
            price: productObject.price,
            rating: productObject.rating
        }
    });
};


// function to insert single image URL into Image table
const insertImage = async (imageUrl: string, productId: number) => {
    await prisma.image.create({
        data: {
            productId: productId,
            url: imageUrl
        }
    });
};


// main function to populate the database
const populateDatabase = async () => {

    // first get categories and loop over the list
    // for each category , insert the category into Category table
    // and get products for each category
    // for each product, insert the image records into Image table
    // and finally insert each product


    const categoryObjectList = await retrieveCategory();

    for(let j=0; j<categoryObjectList.length; j++) {

        const categoryObjectId = j+1;
        const categoryName = categoryObjectList[j].name;
        const categorySlug = categoryObjectList[j].slug;

        await insertCategory(categoryObjectId, categoryName);

        const productObjectList = await retrieveProduct(categorySlug);

        for(let i=0; i<productObjectList.length; i++) {

            const productObject = productObjectList[i];

            await insertProduct(productObject, categoryObjectId);

            // insert images of a productObject into Image table
            const imageList = productObject.images;
            for(let k=0; k<imageList.length; k++) {

                const imageUrl = imageList[k];
                
                await insertImage(imageUrl, productObject.id);
            }

        }

    }
};

populateDatabase();