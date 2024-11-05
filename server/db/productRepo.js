import db from "../connection/db.js";
import client from "../connection/redisConnect.js";
import AppError from "../error/AppError.js";

const addProductRepo = async (productName, categoryId, supplierId, quantityInStock, price, description) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        // Check if user with the same email already exists
        const [existingUser] = await conn.execute(
            `SELECT * FROM products WHERE productName =?`,
            [productName]
        );
        console.log(existingUser[0]);
        
        if (existingUser[0]) {
            throw new AppError("Supplier with the same email already exists.",401);
        }
        const [result] = await conn.execute(
            `INSERT INTO products (productName, categoryId, supplierId, quantityInStock, price, description) VALUES (?,?,?,?,?,?)`,
            [productName, categoryId, supplierId, quantityInStock, price, description]
        );
        await client.set(`productCache:${result.insertId}`, JSON.stringify({
            "productName": productName, 
            "categoryId": categoryId, 
            "supplierId": supplierId, 
            "quantityInStock": quantityInStock, 
            "price": price, 
            "description": description}), {
                EX: 900,
          });
        await conn.commit();
        console.log("Product added successfully!");
        return result.insertId;
    } catch (error) {
        await conn.rollback();
        console.error("Error adding Product:", error);
        throw new AppError("Error adding Product.",500);
    }
    finally {
        conn.release();
    }
}

const getAllProductsRepo = async () => {
    await db.getConnection();
    try {
        const [results] = await db.execute(
            `SELECT * FROM products`
        );
        if (results.length > 0) {
            return results;
        }
        throw new AppError("No products found.",404);
    } catch (error) {
        console.error("Error getting all Products:", error);
        throw new AppError("Error getting all Products.",500);
    }
}

const getProductByIdRepo = async (id) => {
    try {
        // console.log(id);
        
        const cachedData = await client.get(`productCache:${id}`);
        if (cachedData) {
        return JSON.parse(cachedData);
        }
        const [result] = await db.query(
            `SELECT * FROM products WHERE productId = ${id}`
        );
        // console.log(result);
        
        await client.set(`productCache:${id}`, JSON.stringify(result[0]), {
            EX: 900,
          });
        if (result.length > 0) {
            return result[0];
        }
        throw new AppError("Product not found.",404);
    } catch (error) {
        console.error("Error getting Product by id:", error);
        throw new AppError("Error getting Product by id.",500);
    }
}

const updateProductRepo = async (id, productName, categoryId, supplierId, quantityInStock, price, description) => {
    const conn = await db.getConnection();
    try {
        console.log(id);
        
        await conn.beginTransaction();
        const [existingProduct] = await conn.execute(
            `SELECT * FROM products WHERE productId =?`,
            [id]
        );
        console.log(existingProduct[0]);
        
        if (!existingProduct[0]) {
            throw new AppError("Product not found.",404);
        }
        const [result] = await conn.execute(
            `UPDATE products SET productName =?, categoryId =?, supplierId =?, quantityInStock =?, price =?, description =? WHERE productId =?`,
            [productName, categoryId, supplierId, quantityInStock, price, description, id]
        );
        await client.del(`productCache:${id}`);
        await conn.commit();
        console.log("Product updated successfully!");
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error updating Product:", error);
        throw new AppError("Error updating Product.",500);
        
    } finally {
        conn.release();
    }
}

const deleteProductRepo = async (id) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [existingProduct] = await conn.execute(
            `SELECT * FROM products WHERE productId =?`,
            [id]
        );
        if (!existingProduct[0]) {
            throw new AppError("Product not found.",404);
        }
        const [result] = await conn.execute(
            `DELETE FROM products WHERE productId =?`,
            [id]
        );
        await client.del(`productCache:${id}`);
        await conn.commit();
        console.log("Product deleted successfully!");
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error deleting Product:", error);
        throw new AppError("Error deleting Product.",500);
    } finally {
        conn.release();
    }
}

export default {
    addProductRepo,
    getAllProductsRepo,
    getProductByIdRepo,
    updateProductRepo,
    deleteProductRepo,
}