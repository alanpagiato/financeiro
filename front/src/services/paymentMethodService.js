import { api, requestConfig } from "../utils/config";

// pega todas as contas
const getPaymentMethods = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api+"/paymentMethods", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// insere nova conta
const insertPaymentMethod = async (data, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api+"/paymentMethods", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// atualiza conta
const updatePaymentMethod = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api+"/paymentMethods/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// deletando conta
const deletePaymentMethod = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api+"/paymentMethods/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const paymentMethodService = {
    getPaymentMethods,
    insertPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
};

export default paymentMethodService;