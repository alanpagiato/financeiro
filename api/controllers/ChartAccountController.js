const operations = require("../db/operations");
const currentTime = require("../utils/CurrentTime");
const ChartAccount = require("../models/ChartAccount");

const insertChartAccount = async (req, res) => {
  const { description } = req.body;

  // array de dados
  const newChartAccount = {
    description,
  };

  try {
    operations.insert(newChartAccount,"chartAccounts");

    // criado com sucesso
    res.status(201).json({newChartAccount, message: "Plano de conta criado com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getChartAccounts = async (req, res) => {
  try {
    const chartAccounts = await operations.findAll("chartAccounts")
    // busca realizada com sucesso
    res.status(200).json(chartAccounts);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

const updateChartAccount = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  
  // procura se id existe
  const chartAccount = await operations.findById(id,"chartAccounts");
  if (chartAccount.length === 0) {
    res.status(404).json({ errors: ["Plano de Conta não encontrado!"] });
    return;
  }

  // criando array
  const editChartAccount = {};

  // prrenche apenas os campos com valor no array
  if (description) { editChartAccount.description = description; };

  editChartAccount.id = id;
  editChartAccount.updated_at = currentTime();

  try {
    operations.update(editChartAccount, "chartAccounts");

    // atualizado com sucesso
    res.status(201).json({editChartAccount, message: "Plano de conta atualizado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deleteChartAccount = async (req, res) => {
  const { id } = req.params;

  // procura se id da conta existe
  const chartAccount = await operations.findById(id,"chartAccounts");
  if (chartAccount.length === 0) {
    res.status(404).json({ errors: ["Plano de conta não encontrado!"] });
    return;
  }

  try {
    operations.deleteItem(id,"chartAccounts");

    // conta deletada com sucesso
    res.status(201).json({message: "Plano de conta deletado com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  


};

module.exports = {
    insertChartAccount,
    getChartAccounts,
    updateChartAccount,
    deleteChartAccount,
};