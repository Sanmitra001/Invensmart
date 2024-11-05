import productRepo from "../db/productRepo.js";

const addProductService = async ( productName, categoryId, supplierId, quantityInStock, price, description ) => {
    const insertId = await productRepo.addProductRepo(productName, categoryId, supplierId, quantityInStock, price, description);
    return insertId;
}

const getAllProductsService = async () => {
    const products = await productRepo.getAllProductsRepo();
    return products;
}

const getProductByIdService = async(id) => {
    const product = await productRepo.getProductByIdRepo(id);
    return product;
}

const updateProductService = async (id, productName, categoryId, supplierId, quantityInStock, price, description) => {
    const updatedProduct = await productRepo.updateProductRepo(id, productName, categoryId, supplierId, quantityInStock, price, description);
    return updatedProduct;
}

const deleteProductService = async (id) => {
    const deletedProduct = await productRepo.deleteProductRepo(id);
    return deletedProduct;
}

export default { addProductService, getAllProductsService, getProductByIdService, updateProductService, deleteProductService };