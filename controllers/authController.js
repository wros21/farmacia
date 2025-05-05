const User = require('../models/User');

exports.loginForm = (req, res) => {
  res.render('auth/login', { title: 'Iniciar Sesión' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      req.flash('error', 'Usuario no encontrado');
      return res.redirect('/');
    }
    
    const isValid = await user.validPassword(password);
    
    if (!isValid) {
      req.flash('error', 'Contraseña incorrecta');
      return res.redirect('/');
    }
    
    req.session.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
    
    req.flash('success', `Bienvenido ${user.name}`);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al iniciar sesión');
    res.redirect('/');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};