const jwt = require('jsonwebtoken');

// Verify JWT token
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admin only.' });
  }
  next();
};

// Check if user is contributor or admin
const isContributor = (req, res, next) => {
  if (req.user.role !== 'contributor' && req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Contributor or Admin only.' });
  }
  next();
};

module.exports = { auth, isAdmin, isContributor };
