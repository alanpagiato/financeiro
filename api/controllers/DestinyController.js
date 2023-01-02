const operations = require("../db/operations");
const currentTime = require("../utils/CurrentTime");
const Destiny = require("../models/Destiny");

const insertDestiny = async (req, res) => {
  const { name } = req.body;

  // criando array
  const newDestiny = {
        name,
    };

  try {
    operations.insert(newDestiny, "destinys");

    // criado com sucesso
    res.status(201).json({newDestiny, message: "Destino criado com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getDestinys = async (req, res) => {
  try {
    const destinys = await operations.findAll("destinys");
    // busca realizada com sucesso
    res.status(200).json(destinys);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

const updateDestiny = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  // procura se id existe
  const destiny = await operations.findById(id, "destinys");
  if (destiny.length === 0) {
    res.status(404).json({ errors: ["Destino não encontrado!"] });
    return;
  }

  // criando array
  const editDestiny = {};

  // prrenche apenas os campos com valor no array
  if (name) { editDestiny.name = name };

  editDestiny.id = id;
  editDestiny.updated_at = currentTime()

  try {
    operations.update(editDestiny, "destinys");

    // atualizado com sucesso
    res.status(201).json({editDestiny, message: "Destino atualizado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deleteDestiny = async (req, res) => {
  const { id } = req.params;

  // procura se id existe
  const destiny = await operations.findById(id, "destinys");
  if (destiny.length === 0) {
    res.status(404).json({ errors: ["Destino não encontrado!"] });
    return;
  }

  try {
    operations.deleteItem(id, "destinys");

    // deletado com sucesso
    res.status(201).json({message: "Destino deletado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  


};

module.exports = {
    insertDestiny,
    getDestinys,
    updateDestiny,
    deleteDestiny,
};