const { Sale, Product } = require('../models');

exports.index = async (req, res) => {
  try {
    // Obtener ventas del día
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailySales = await Sale.findAll({
      where: {
        date: {
          [Op.gte]: today
        }
      }
    });
    
    const dailyTotal = dailySales.reduce((sum, sale) => sum + sale.subtotal, 0);
    
    // Obtener ventas del mes
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const monthlySales = await Sale.findAll({
      where: {
        date: {
          [Op.gte]: firstDayOfMonth
        }
      }
    });
    
    const monthlyTotal = monthlySales.reduce((sum, sale) => sum + sale.subtotal, 0);
    
    // Producto más vendido
    const bestSellingProduct = await Product.findOne({
      order: [
        ['sales_count', 'DESC']
      ]
    });
    
    // Productos por vencer (30 días)
    const expirationThreshold = new Date();
    expirationThreshold.setDate(expirationThreshold.getDate() + 30);
    
    const expiringProducts = await Product.findAll({
      where: {
        expiration_date: {
          [Op.lte]: expirationThreshold
        },
        stock: {
          [Op.gt]: 0
        }
      },
      order: [
        ['expiration_date', 'ASC']
      ],
      limit: 5
    });
    
    res.render('dashboard/index', {
      title: 'Dashboard',
      dailyTotal,
      monthlyTotal,
      bestSellingProduct,
      expiringProducts
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al cargar el dashboard');
    res.redirect('/');
  }
};