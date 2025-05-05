const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  payment_method: {
    type: DataTypes.ENUM('cash', 'card', 'transfer'),
    allowNull: false,
    defaultValue: 'cash'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  seller_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Sale.associate = function(models) {
  Sale.belongsTo(models.User, { foreignKey: 'user_id' });
  Sale.belongsToMany(models.Product, {
    through: 'SaleProducts',
    foreignKey: 'sale_id',
    otherKey: 'product_id'
  });
};

module.exports = Sale;