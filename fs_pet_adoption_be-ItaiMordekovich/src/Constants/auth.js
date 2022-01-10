const jwt = require('jsonwebtoken');
const secret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3f'

exports.generateToken = (userEmail) =>{
    return jwt.sign(userEmail, secret, { expiresIn: '248300s' });
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }