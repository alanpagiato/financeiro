const db = require("./config");
const bcrypt = require("bcryptjs");

const insert = (data, nameTable) => {
    return db(nameTable)
    .insert(data)
    .then(() => {
      return data;
    });
};

const update = (data, nameTable) => {
    return db.update(data).where("id", data.id).table(nameTable)
    .then(() => {
        return data;
      });
};

const deleteItem = (id, nameTable) => {
    return db.delete().where("id", id).table(nameTable)
    .then(() => {
        return;
    });
};

const findAll = (nameTable) => {
    const data = db.select().table(nameTable);
    return data;
}

const findById = async (id, nameTable) => {
    const data = await db.select().from(nameTable).where("id", id);
    return data;
};

const findByField = (nameField, data, nameTable) => {
    const dataFind = db.select().from(nameTable).where(nameField, data);
    return dataFind;
}

const encryptPassword = async (data) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
};

module.exports = {
    insert,
    update,
    deleteItem,
    findAll,
    findById,
    findByField,
    encryptPassword,
};