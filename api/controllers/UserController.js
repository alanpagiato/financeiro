const operations = require("../db/operations");
const currentTime = require("../utils/CurrentTime");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Gerando o token de USUARIO
const generateToken = (id, group) => {
    return jwt.sign({ id, group }, jwtSecret,{expiresIn: "1d"});
};

// Registro de usuario
const register = async (req, res) => {
    const { username, name, password, group } = req.body;
  
    // checa se username existe
    const user = await operations.findByField("username", username, "users");
    
    if (user.length > 0) {
      res.status(422).json({ errors: ["Usuário já cadastrado !"] });
      return;
    }
  
    // gerando hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
  
    // criando array do usuario
    const newUser = {
      username,  
      name,
      password: passwordHash,
      group: group
    };
  
    // valida se houve algum erro
    if (!newUser) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    try {
        operations.insert(newUser,"users");
    
        // criado com sucesso
        res.status(201).json({newUser, message: "Usuário criado com sucesso!"});
    
      } catch (error) {
        res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
        console.log(error)
        return;
      }
};

// login
const login = async(req,res) => {
    const {username, password} = req.body;
    const user = await operations.findByField("username", username, "users");

    // verifica se o usuario existe
    if(user.length === 0) {
        res.status(404).json({errors: ["Usuário não encontrado !"]});
        return;
    }

    //checa a senha com o bcrypt
    if(!(await bcrypt.compare(password, user[0].password))){
        res.status(422).json({errors: ["Senha inválida !"]});
        return;
    };

    // retorna usuario com token
    res.status(201).json({
        id: user[0].id,
        token: generateToken(user[0].id,user[0].group),
        group: user[0].group,
    });
};

// busca todos os usuarios
const getUsers = async (req, res) => {
  try {
    const users = await operations.findAll("users");
    // busca realizada com sucesso
    res.status(200).json(users);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

// busca o usuario pelo id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await operations.findById(id, "users");
    if (user.length === 0) {
      res.status(404).json({ errors: ["Usuário não encontrado!"] });
      return;
    }
    // busca realizada com sucesso
    res.status(200).json(user[0]);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, group } = req.body;
  
  // procura se id do usuario existe
  const user = await operations.findById(id, "users");
  if (user.length === 0) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // criando array do usuario editado
  const editUser = {};

  // prrenche apenas os campos com valor no array
  if (name) { editUser.name = name; };
  if (password) { 
    // gerando hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    editUser.password = passwordHash; 
  };
  if (group) { editUser.group = group; };

  if (Object.keys(editUser).length === 0){
    res.status(422).json({ errors: ["Dados não foram enviados!"] });
    return;
  };

  editUser.id = id;
  editUser.updated_at = currentTime();
  
  try {
    operations.update(editUser, "users");

    // usuario atualizado com sucesso
    res.status(201).json({editUser, message: "Usuário atualizado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // procura se id do usuario existe
  const user = await operations.findById(id, "users");
  if (user.length === 0) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  try {
    operations.deleteItem(id, "users");

    // usuario deletado com sucesso
    res.status(201).json({message: "Usuário deletado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

module.exports = {
    register,
    login,
    getUsers,
    updateUser,
    deleteUser,
    getUserById,
};