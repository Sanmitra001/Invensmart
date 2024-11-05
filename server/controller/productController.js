import AppError from "../error/AppError.js";
import productService from "../service/productService.js";

const addProduct = async (req,res,next) => {
    const { productName, categoryId, supplierId, quantityInStock, price, description } = req.body;
    try {
        if (!productName || !categoryId || !supplierId || !quantityInStock || !price || !description ) {
            throw new AppError("All fields are Required",404);
        }
        const productId = await productService.addProductService(productName, categoryId, supplierId, quantityInStock, price, description);
        if (!productId) {
            throw new AppError("Failed to add Product", 400);
        }
        res.status(201).json({ message: 'Product added successfully.', productId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsService();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getProductById = async (req,res,next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductByIdService(id);
        if (!product) {
            throw new AppError("Product Not Found",404);
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateProduct = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { productName, categoryId, supplierId, quantityInStock, price, description } = req.body;
        if (!productName || !categoryId || !supplierId || !quantityInStock || !price || !description ) {
            throw new AppError("All fields are Required",404);
        }
        const updatedProduct = await productService.updateProductService(id, productName, categoryId, supplierId, quantityInStock, price, description);
        if (!updatedProduct) {
            throw new AppError("Failed to update Product", 400);
        }
        res.status(200).json({ message: 'Product updated successfully.'});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteProduct = async (req,res,next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productService.deleteProductService(id);
        if (!deletedProduct) {
            throw new AppError("Product Not Found",404);
        }
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default{ addProduct, getAllProduct, getProductById, updateProduct, deleteProduct };