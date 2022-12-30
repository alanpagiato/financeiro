const db = require("../db/config");

// criando tabela no banco se não existir
db.schema.hasTable('users')
    .then((exists) => {
        if (!exists) {
            return db.schema.createTable('users', function(user) {
                user.increments('id').primary();
                user.string('username').notNullable();
                user.string('name').nullable();
                user.string('password').notNullable();
                user.string('group').notNullable();
                user.timestamp('created_at').defaultTo(db.fn.now());
                user.timestamp('updated_at').defaultTo(db.fn.now());
            });
        }
    }).then(function() {
        console.log('Tabela "users" criada com sucesso ou já existe!');
    });

// inserindo novo usuario
const insert = (user) => {
    return db('users')
    .insert(user)
    .then(() => {
      return user;
    });
};

// buscando usuario por apelido
const findByUsername = (username) => {
    const user = db.select().from("users").where("username", username);
    return user;
}

// buscando todas os usuarios
const findAll = () => {
    const users = db.select(["id", "username", "name", "group"]).table("users");
    return users;
}

// busca usuario pelo id
const findById = async (id) => {
    const user = await db.select(["id", "username", "name", "group" ]).from("users").where("id", id);
    return user;
};

// editando usuario
const update = (user, id) => {
    return db.update(user).where("id", id).table("users")
    .then(() => {
        return user;
      });
};

// deletando usuario
const deleteItem = (id) => {
    return db.delete().where("id", id).table("users")
    .then(() => {
        return;
    });

};

module.exports = {
    insert,
    findByUsername,
    findAll,
    update,
    findById,
    deleteItem,
};