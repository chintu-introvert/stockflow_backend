const { Product } = require('../models');
const { Op } = require('sequelize');

const getProducts = async (req, res) => {
    try {
        const { search } = req.query;
        const organizationId = req.user.organizationId;

        let whereClause = { organizationId };

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { sku: { [Op.like]: `%${search}%` } },
            ];
        }

        const products = await Product.findAll({ where: whereClause });
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, sku, description, quantityOnHand, costPrice, sellingPrice, lowStockThreshold } = req.body;

        if (!name || !sku) {
            return res.status(400).json({ message: 'Name and SKU are required' });
        }

        const product = await Product.create({
            name,
            sku,
            description,
            quantityOnHand: quantityOnHand || 0,
            costPrice,
            sellingPrice,
            lowStockThreshold,
            organizationId: req.user.organizationId,
        });

        res.status(201).json(product);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Product with this SKU already exists in your organization' });
        }
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const organizationId = req.user.organizationId;

        const product = await Product.findOne({ where: { id, organizationId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update(req.body);
        res.json(product);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'SKU already in use' });
        }
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const organizationId = req.user.organizationId;

        const product = await Product.findOne({ where: { id, organizationId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
