const operations = require("../db/operations");
const currentTime = require("../utils/CurrentTime");
const PaymentMethod = require("../models/PaymentMethod");

const insertPaymentMethod = async (req, res) => {
  const { description } = req.body;

  // Ciando array
  const newPaymentMethod = {
        description,
    };

  try {
    operations.insert(newPaymentMethod, "paymentMethods");

    // criado com sucesso
    res.status(201).json({newPaymentMethod, message: "Forma de pagamento criada com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await operations.findAll("paymentMethods");
    // busca realizada com sucesso
    res.status(200).json(paymentMethods);

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
};

const updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  
  // procura se id existe
  const paymentMethod = await operations.findById(id, "paymentMethods");
  if (paymentMethod.length === 0) {
    res.status(404).json({ errors: ["Forma de pagamento não encontrada!"] });
    return;
  }

  // criando array
  const editPaymentMethod = {};

  // prrenche apenas os campos com valor no array
  if (description) { editPaymentMethod.description = description; };
  
  editPaymentMethod.id = id;
  editPaymentMethod.updated_at = currentTime()

  try {
    operations.update(editPaymentMethod, "paymentMethods");

    // atualizado com sucesso
    res.status(201).json({editPaymentMethod, message: "Forma de pagamento atualizada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deletePaymentMethod = async (req, res) => {
  const { id } = req.params;

  // procura se id  existe
  const paymentMethod = await operations.findById(id, "paymentMethods");
  if (paymentMethod.length === 0) {
    res.status(404).json({ errors: ["Forma de pagamento não encontrada!"] });
    return;
  }

  try {
    operations.deleteItem(id, "paymentMethods");

    // deletado com sucesso
    res.status(201).json({message: "Forma de pagamento deletada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  


};

module.exports = {
    insertPaymentMethod,
    getPaymentMethods,
    updatePaymentMethod,
    deletePaymentMethod,
};