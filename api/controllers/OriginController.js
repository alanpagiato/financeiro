const Origin = require("../models/Origin");
const currentTime = require("../utils/CurrentTime");

const insertOrigin = async (req, res) => {
  const { name } = req.body;

  // Create new account
  const newOrigin = {
        name,
    };

  try {
    Origin.insert(newOrigin);

    // conta criada com sucesso
    res.status(201).json({newOrigin, message: "Origem criada com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getOrigins = async (req, res) => {
  try {
    const origins = await Origin.findAll();
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
  const origin = await Origin.findById(id);
  if (origin.length === 0) {
    res.status(404).json({ errors: ["Origem não encontrada!"] });
    return;
  }

  // criando array da conta editada
  const editOrigin = {};

  // prrenche apenas os campos com valor no array
  if (name) { editOrigin.name = name };

  editOrigin.updated_at = currentTime()

  try {
    Origin.update(editOrigin, id);

    // conta atualizada com sucesso
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
  const origin = await Origin.findById(id);
  if (origin.length === 0) {
    res.status(404).json({ errors: ["Origem não encontrada!"] });
    return;
  }

  try {
    Origin.deleteItem(id);

    // conta deletada com sucesso
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