const requireAuth = require('./requireauth');

const authorize = (roles = []) => {
  return (req, res, next) => {
    // Ensure the user is authenticated
    requireAuth(req, res, () => {
      // Check if user has the required role
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    });
  };
};

module.exports = authorize;
