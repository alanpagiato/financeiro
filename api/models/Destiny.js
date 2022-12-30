const db = require("../db/config");

// criando tabela no banco se não existir
db.schema.hasTable('destinys')
    .then((exists) => {
        if (!exists) {
            return db.schema.createTable('destinys', function(account) {
                account.increments('id').primary();
                account.string('name').notNullable();
                account.timestamp('created_at').defaultTo(db.fn.now());
                account.timestamp('updated_at').defaultTo(db.fn.now());
            });
        }
    }).then(function() {
        console.log('Tabela "destinys" criada com sucesso ou já existe!');
    });

// inserindo nova conta
const insert = (destiny) => {
    return db('destinys')
    .insert(destiny)
    .then(() => {
      return destiny;
    });
};

// procurando todas as contas
const findAll = () => {
    const destinys = db.select(["*"]).table("destinys");
    return destinys;
}

// busca conta pelo id
const findById = async (id) => {
    const destiny = await db.select().from("destinys").where("id", id);
    return destiny;

};

// editando conta
const update = (destiny, id) => {
    return db.update(destiny).where("id", id).table("destinys")
    .then(() => {
        return destiny;
      });
};

// deletando conta
const deleteItem = (id) => {
    return db.delete().where("id", id).table("destinys")
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