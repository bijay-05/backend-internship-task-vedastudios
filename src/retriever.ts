import axios from 'axios';
import { productObj, categoryObj } from './interface.js';

const api = axios.create({baseURL: "https://dummyjson.com"});

const retrieveCategory = async (): Promise<categoryObj[]> => {

    // get response from API
    const categoryList = (await api.get('/products/categories')).data;
    return categoryList;
};


const retrieveProduct = async (categorySlug: string): Promise<productObj[]> => {

    const response = (await api.get(`/products/category/${categorySlug}?select=id,images,title,price,rating`)).data;
    const productList = response.products;
    console.log(`Total products retrieved from API: ${productList.length}`)
    return productList;
}

export {retrieveCategory, retrieveProduct};