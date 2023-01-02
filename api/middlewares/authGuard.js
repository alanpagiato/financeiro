const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const operations = require("../db/operations");

const authGuard = async (req,res,next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // verifica se o cabeçalho tem o token
    if(!token) return res.status(401).json({errors:["Acesso negado !"]});

    // verifica se o token é valido
    try {
        
        const verified = jwt.verify(token, jwtSecret);
        req.user = await operations.findById(verified.id, "users");

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({errors: ["Token inválido !"]})
    };
    
};

module.exports = authGuard;