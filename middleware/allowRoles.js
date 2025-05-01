// 📁 middleware/allowRoles.js
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.username)) {
      return res.status(403).json({ message: 'Access denied: Unauthorized role' });
    }
    next();
  };
};
