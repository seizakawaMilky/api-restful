const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'Sem token informada' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar token' });
      
      req.userId = decoded.id;
      next();
    });
}

module.exports = {
    verifyJWT
};