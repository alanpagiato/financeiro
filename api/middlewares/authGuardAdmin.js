const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuardAdmin = async (req,res,next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // verifica se o cabeçalho tem o token
    if(!token) return res.status(401).json({errors:["Acesso negado !"]});

    // verifica se o token é valido
    try {
        
        const verified = jwt.verify(token, jwtSecret);

        const user = await User.findById(verified.id);

        if (user[0].group !== "admin"){
            res.status(401).json({errors:["Sem autorização !"]});
            return;
        };

        next();

    } catch (error) {
        res.status(401).json({errors: ["Token inválido !"]})
    };
    
};

module.exports = authGuardAdmin;