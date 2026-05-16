const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setting = sequelize.define('Setting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    defaultLowStockThreshold: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
    },
}, {
    timestamps: true,
    updatedAt: true,
    createdAt: false, // User only specified updatedAt, but I'll keep it simple
});

module.exports = Setting;
