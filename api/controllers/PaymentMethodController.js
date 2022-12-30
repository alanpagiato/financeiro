const PaymentMethod = require("../models/PaymentMethod");
const currentTime = require("../utils/CurrentTime");

const insertPaymentMethod = async (req, res) => {
  const { description } = req.body;

  // Create new account
  const newPaymentMethod = {
        description,
    };

  try {
    PaymentMethod.insert(newPaymentMethod);

    // conta criada com sucesso
    res.status(201).json({newPaymentMethod, message: "Forma de pagamento criada com sucesso!"});

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  

};

const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
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
  
  // procura se id da conta existe
  const paymentMethod = await PaymentMethod.findById(id);
  if (paymentMethod.length === 0) {
    res.status(404).json({ errors: ["Forma de pagamento não encontrada!"] });
    return;
  }

  // criando array da conta editada
  const editPaymentMethod = {};

  // prrenche apenas os campos com valor no array
  if (description) { editPaymentMethod.description = description; };
  
  editPaymentMethod.updated_at = currentTime()

  try {
    PaymentMethod.update(editPaymentMethod, id);

    // conta atualizada com sucesso
    res.status(201).json({editPaymentMethod, message: "Forma de pagamento atualizada com sucesso!" });

  } catch (error) {
    res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]});
    console.log(error)
    return;
  }  
 
};

const deletePaymentMethod = async (req, res) => {
  const { id } = req.params;

  // procura se id da conta existe
  const paymentMethod = await PaymentMethod.findById(id);
  if (paymentMethod.length === 0) {
    res.status(404).json({ errors: ["Forma de pagamento não encontrada!"] });
    return;
  }

  try {
    PaymentMethod.deleteItem(id);

    // conta deletada com sucesso
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