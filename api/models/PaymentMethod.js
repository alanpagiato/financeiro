const db = require("../db/config");

// criando tabela no banco se não existir
db.schema.hasTable('paymentMethods')
    .then((exists) => {
        if (!exists) {
            return db.schema.createTable('paymentMethods', function(account) {
                account.increments('id').primary();
                account.string('description').notNullable();
                account.timestamp('created_at').defaultTo(db.fn.now());
                account.timestamp('updated_at').defaultTo(db.fn.now());
            });
        }
    }).then(function() {
        console.log('Tabela "paymentMethods" criada com sucesso ou já existe!');
    });

// inserindo nova conta
const insert = (paymentMethod) => {
    return db('paymentMethods')
    .insert(paymentMethod)
    .then(() => {
      return paymentMethod;
    });
};

// procurando todas as contas
const findAll = () => {
    const paymentMethods = db.select(["*"]).table("paymentMethods");
    return paymentMethods;
}

// busca conta pelo id
const findById = async (id) => {
    const paymentMethod = await db.select().from("paymentMethods").where("id", id);
    return paymentMethod;

};

// editando conta
const update = (paymentMethod, id) => {
    return db.update(paymentMethod).where("id", id).table("paymentMethods")
    .then(() => {
        return paymentMethod;
      });
};

// deletando conta
const deleteItem = (id) => {
    return db.delete().where("id", id).table("paymentMethods")
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