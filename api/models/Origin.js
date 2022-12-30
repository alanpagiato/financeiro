const db = require("../db/config");

// criando tabela no banco se não existir
db.schema.hasTable('origins')
    .then((exists) => {
        if (!exists) {
            return db.schema.createTable('origins', function(account) {
                account.increments('id').primary();
                account.string('name').notNullable();
                account.timestamp('created_at').defaultTo(db.fn.now());
                account.timestamp('updated_at').defaultTo(db.fn.now());
            });
        }
    }).then(function() {
        console.log('Tabela "origins" criada com sucesso ou já existe!');
    });

// inserindo nova conta
const insert = (origin) => {
    return db('origins')
    .insert(origin)
    .then(() => {
      return origin;
    });
};

// procurando todas as contas
const findAll = () => {
    const origins = db.select(["*"]).table("origins");
    return origins;
}

// busca conta pelo id
const findById = async (id) => {
    const origin = await db.select().from("origins").where("id", id);
    return origin;

};

// editando conta
const update = (origin, id) => {
    return db.update(origin).where("id", id).table("origins")
    .then(() => {
        return origin;
      });
};

// deletando conta
const deleteItem = (id) => {
    return db.delete().where("id", id).table("origins")
    .then(() => {
        return;
    });

};

module.exports = {
    insert,
    findAll,
    update,
    findById,
    deleteItem,
};