const { Product, Setting } = require('../models');

const getDashboardStats = async (req, res) => {
    try {
        const organizationId = req.user.organizationId;

        const products = await Product.findAll({ where: { organizationId } });
        const setting = await Setting.findOne({ where: { organizationId } });

        const totalProducts = products.length;
        const totalQuantity = products.reduce((sum, p) => sum + (p.quantityOnHand || 0), 0);

        const defaultThreshold = setting ? setting.defaultLowStockThreshold : 5;

        const lowStockItems = products.filter(p => {
            const threshold = p.lowStockThreshold !== null && p.lowStockThreshold !== undefined 
                ? p.lowStockThreshold 
                : defaultThreshold;
            return p.quantityOnHand <= threshold;
        }).map(p => ({
            name: p.name,
            sku: p.sku,
            quantityOnHand: p.quantityOnHand,
            lowStockThreshold: p.lowStockThreshold !== null ? p.lowStockThreshold : defaultThreshold
        }));

        res.json({
            totalProducts,
            totalQuantity,
            lowStockItems
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getDashboardStats,
};
