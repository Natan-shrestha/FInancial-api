module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    
    next();
  };
  