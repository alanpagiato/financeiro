import { api,requestConfig } from "../utils/config";

// pega todas as contas
const getAccounts = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api+"/accounts", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// insere nova conta
const insertAccount = async (data, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api+"/accounts", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// atualiza conta
const updateAccount = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api+"/accounts/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// deletando conta
const deleteAccount = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api+"/accounts/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const accountService = {
    getAccounts,
    insertAccount,
    updateAccount,
    deleteAccount,
};

export default accountService;