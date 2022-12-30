import { api, requestConfig } from "../utils/config";

// pega todas as contas
const getOrigins = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api+"/origins", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// insere nova conta
const insertOrigin = async (data, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api+"/origins", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// atualiza conta
const updateOrigin = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api+"/origins/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// deletando conta
const deleteOrigin = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api+"/origins/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const originService = {
    getOrigins,
    insertOrigin,
    updateOrigin,
    deleteOrigin,
};

export default originService;