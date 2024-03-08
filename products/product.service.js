const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

async function getAllProducts() {
    return await db.Product.findAll();
}

async function getProductById(id) {
    return await getProduct(id);
}

async function createProduct(params) {
    // Check if a product with the same name already exists
    const existingProduct = await db.Product.findOne({ where: { name: params.name } });
    if (existingProduct) {
        throw 'Product with name "' + params.name + '" already exists';
    }

    // Create a new product instance and save it to the database
    const product = await db.Product.create(params);
    return product;
}

async function updateProduct(id, params) {
    const product = await getProduct(id);

    // Check if a product with the updated name already exists
    if (params.name && params.name !== product.name) {
        const existingProduct = await db.Product.findOne({ where: { name: params.name } });
        if (existingProduct) {
            throw 'Product with name "' + params.name + '" already exists';
        }
    }

    // Update the product with the new parameters
    Object.assign(product, params);
    await product.save();
    return product;
}

async function deleteProduct(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) {
        throw 'Product not found';
    }
    return product;
}
