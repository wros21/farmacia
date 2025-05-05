const { Product, Provider } = require('../models');
const { Op } = require('sequelize');

exports.list = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: Provider,
      where: { status: true }
    });
    
    res.render('products/list', {
      title: 'Lista de Productos',
      products
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al cargar la lista de productos');
    res.redirect('/dashboard');
  }
};

exports.addForm = async (req, res) => {
  try {
    const providers = await Provider.findAll({ where: { status: true } });
    
    res.render('products/add', {
      title: 'Agregar Producto',
      providers
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al cargar el formulario');
    res.redirect('/products');
  }
};

exports.add = async (req, res) => {
  try {
    const {
      name,
      description,
      barcode,
      laboratory,
      price,
      cost,
      stock,
      min_stock,
      expiration_date,
      provider_id
    } = req.body;
    
    await Product.create({
      name,
      description,
      barcode,
      laboratory,
      price: parseFloat(price),
      cost: parseFloat(cost),
      stock: parseInt(stock),
      min_stock: parseInt(min_stock),
      expiration_date,
      provider_id: parseInt(provider_id)
    });
    
    req.flash('success', 'Producto agregado correctamente');
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al agregar el producto');
    res.redirect('/products/add');
  }
};

// Otros métodos: editForm, edit, delete, expiredList, etc.