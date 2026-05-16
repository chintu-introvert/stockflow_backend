const sequelize = require('../config/database');
const Organization = require('./Organization');
const User = require('./User');
const Product = require('./Product');
const Setting = require('./Setting');

// Associations
Organization.hasOne(User, { foreignKey: 'organizationId' });
User.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Product, { foreignKey: 'organizationId' });
Product.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasOne(Setting, { foreignKey: 'organizationId' });
Setting.belongsTo(Organization, { foreignKey: 'organizationId' });

module.exports = {
    sequelize,
    Organization,
    User,
    Product,
    Setting,
};
