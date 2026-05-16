const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    quantityOnHand: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    costPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    sellingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    lowStockThreshold: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['organizationId', 'sku'],
        },
    ],
});

module.exports = Product;
