const Account = require("../models/Account");
const currentTime = require("../utils/CurrentTime");

const insertAccount = async (req, res) => {
  const { name, agency, accountNumber, accountDigit, bank } = req.body;

  // Create new account
  const newAccount = {
        name,
        agency,
        accountNumber,
        accountDigit,
        bank
    };

  try {
    Account.insert(newAccount);

    // conta criada com sucesso
    res.status(201).json({newAccount, message: "Conta criada com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    // busca realizada com sucesso
    res.status(200).json(accounts);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { name, agency, accountNumber, accountDigit, bank } = req.body;
  
  // procura se id da conta existe
  const account = await Account.findById(id);
  if (account.length === 0) {
    res.status(404).json({ errors: ["Conta não encontrada!"] });
    return;
  }

  // criando array da conta editada
  const editAccount = {};

  // prrenche apenas os campos com valor no array
  if (name) { editAccount.name = name; };
  if (agency) { editAccount.agency = agency; };
  if (accountNumber) { editAccount.accountNumber = accountNumber; };
  if (accountDigit) { editAccount.accountDigit = accountDigit; };
  if (bank) { editAccount.bank = bank; };
  
  if (Object.keys(editAccount).length === 0){
    res.status(422).json({ errors: ["Dados não foram enviados!"] });
    return;
  };

  editAccount.updated_at = currentTime();

  try {
    Account.update(editAccount, id);

    // conta atualizada com sucesso
    res.status(201).json({editAccount, message: "Conta atualizada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  // procura se id da conta existe
  const account = await Account.findById(id);
  if (account.length === 0) {
    res.status(404).json({ errors: ["Conta não encontrada!"] });
    return;
  }

  try {
    Account.deleteItem(id);

    // conta deletada com sucesso
    res.status(201).json({message: "Conta deletada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  


};

module.exports = {
    insertAccount,
    getAccounts,
    updateAccount,
    deleteAccount,
};