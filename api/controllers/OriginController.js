const operations = require("../db/operations");
const currentTime = require("../utils/CurrentTime");
const Origin = require("../models/Origin");

const insertOrigin = async (req, res) => {
  const { name } = req.body;

  // criando array
  const newOrigin = {
        name,
    };

  try {
    operations.insert(newOrigin, "origins");

    // criado com sucesso
    res.status(201).json({newOrigin, message: "Origem criada com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getOrigins = async (req, res) => {
  try {
    const origins = await operations.findAll("origins");
    // busca realizada com sucesso
    res.status(200).json(origins);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

const updateOrigin = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  // procura se id da conta existe
  const origin = await operations.findById(id, "origins");
  if (origin.length === 0) {
    res.status(404).json({ errors: ["Origem não encontrada!"] });
    return;
  }

  // criando array
  const editOrigin = {};

  // prrenche apenas os campos com valor no array
  if (name) { editOrigin.name = name };

  editOrigin.id = id;
  editOrigin.updated_at = currentTime()

  try {
    operations.update(editOrigin, "origins");

    // atualizado com sucesso
    res.status(201).json({editOrigin, message: "Origem atualizada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deleteOrigin = async (req, res) => {
  const { id } = req.params;

  // procura se id da conta existe
  const origin = await operations.findById(id, "origins");
  if (origin.length === 0) {
    res.status(404).json({ errors: ["Origem não encontrada!"] });
    return;
  }

  try {
    operations.deleteItem(id, "origins");

    // deletado com sucesso
    res.status(201).json({message: "Origem deletada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  


};

module.exports = {
    insertOrigin,
    getOrigins,
    updateOrigin,
    deleteOrigin,
};