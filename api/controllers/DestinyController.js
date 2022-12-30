const Destiny = require("../models/Destiny");
const currentTime = require("../utils/CurrentTime");

const insertDestiny = async (req, res) => {
  const { name } = req.body;

  // Create new account
  const newDestiny = {
        name,
    };

  try {
    Destiny.insert(newDestiny);

    // conta criada com sucesso
    res.status(201).json({newDestiny, message: "Destino criado com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getDestinys = async (req, res) => {
  try {
    const destinys = await Destiny.findAll();
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
  
  // procura se id da conta existe
  const destiny = await Destiny.findById(id);
  if (destiny.length === 0) {
    res.status(404).json({ errors: ["Destino não encontrado!"] });
    return;
  }

  // criando array da conta editada
  const editDestiny = {};

  // prrenche apenas os campos com valor no array
  if (name) { editDestiny.name = name };

  editDestiny.updated_at = currentTime()

  try {
    Destiny.update(editDestiny, id);

    // conta atualizada com sucesso
    res.status(201).json({editDestiny, message: "Destino atualizado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deleteDestiny = async (req, res) => {
  const { id } = req.params;

  // procura se id da conta existe
  const destiny = await Destiny.findById(id);
  if (destiny.length === 0) {
    res.status(404).json({ errors: ["Destino não encontrado!"] });
    return;
  }

  try {
    Destiny.deleteItem(id);

    // conta deletada com sucesso
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