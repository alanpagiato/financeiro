import { api, requestConfig } from "../utils/config";

// pega todas as contas
const getDestinys = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api+"/destinys", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// insere nova conta
const insertDestiny = async (data, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api+"/destinys", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// atualiza conta
const updateDestiny = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api+"/destinys/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// deletando conta
const deleteDestiny = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api+"/destinys/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const destinyService = {
    getDestinys,
    insertDestiny,
    updateDestiny,
    deleteDestiny,
};

export default destinyService;