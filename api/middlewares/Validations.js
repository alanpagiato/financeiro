const {body} = require("express-validator");

const accountInsertValidation = () => {
    return [
        body("name").
        not().isEmpty().withMessage("O nome é obrigatório !"),
        body("bank").custom((value, {req}) => {
            if(value != "1" && value != "0") {
                throw new Error("Banco deve ser verdadeiro ou falso !")
            };
            return true;
        }),
    ];
};

const accountUpdateValidation = () => {
    return [
        body("bank").custom((value, {req}) => {
            if (value) {
                if(value != "1" && value != "0") {
                    throw new Error("Banco deve ser verdadeiro ou falso !")
                };
            }
            return true;
        }),
    ];
};

const paymentMethodValidation = () => {
    return [
        body("description").
        not().isEmpty().withMessage("A descrição é obrigatória !"),
    ];
};

const userInsertValidation = () => {
    return [
        body("username").
        not().isEmpty().withMessage("O username é obrigatório !")
        .matches(/^[^A-Z\s]+$/).withMessage('O username não pode conter espaços em branco e nem letras maiúsculas'),
        body("name").
        not().isEmpty().withMessage("O nome é obrigatório !"),
        body("password").
        not().isEmpty().withMessage("A senha é obrigatória !")
        .matches(/^\S*$/).withMessage('A senha não pode conter espaços em branco'),
        body("group").
        not().isEmpty().withMessage("O grupo é obrigatório !")
        .matches(/^[^A-Z\s]+$/).withMessage('O grupo não pode conter espaços em branco e nem letras maiúsculas'),
    ];
};

const userLoginValidation = () => {
    return [
        body("username").
        not().isEmpty().withMessage("O username é obrigatório !"),
        body("password").
        not().isEmpty().withMessage("A senha é obrigatória !"),
    ];
};

const userUpdateValidation = () => {
    return [
        body("password")
        .matches(/^\S*$/).withMessage('A senha não pode conter espaços em branco'),
        body("group")
        .matches(/^[^A-Z\s]+$/).withMessage('O grupo não pode conter espaços em branco e nem letras maiúsculas'),
    ];
};

const originValidation = () => {
    return [
        body("name").
        not().isEmpty().withMessage("O nome é obrigatório !"),
    ];
};

const destinyValidation = () => {
    return [
        body("name").
        not().isEmpty().withMessage("O nome é obrigatório !"),
    ];
};

const chartAccountValidation = () => {
    return [
        body("description").
        not().isEmpty().withMessage("A descrição é obrigatória !"),
    ];
};

module.exports = {
    accountInsertValidation,
    accountUpdateValidation,
    paymentMethodValidation,
    userInsertValidation,
    userLoginValidation,
    userUpdateValidation,
    originValidation,
    destinyValidation,
    chartAccountValidation,
};