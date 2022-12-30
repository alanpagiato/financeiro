const db = require("../db/config");

// criando tabela no banco se não existir
db.schema.hasTable('accounts')
    .then((exists) => {
        if (!exists) {
            return db.schema.createTable('accounts', function(account) {
                account.increments('id').primary();
                account.string('name').notNullable();
                account.string('agency').nullable();
                account.string('accountNumber').nullable();
                account.string('accountDigit').nullable();
                account.boolean('bank').notNullable().defaultTo(false);
                account.timestamp('created_at').defaultTo(db.fn.now());
                account.timestamp('updated_at').defaultTo(db.fn.now());
            });
        }
    }).then(function() {
        console.log('Tabela "accounts" criada com sucesso ou já existe!');
    });

// inserindo nova conta
const insert = (account) => {
    return db('accounts')
    .insert(account)
    .then(() => {
      return account;
    });
};

// procurando todas as contas
const findAll = () => {
    const accounts = db.select(["*"]).table("accounts");
    return accounts;
}

// busca conta pelo id
const findById = async (id) => {
    const account = await db.select().from("accounts").where("id", id);
    return account;

};

// editando conta
const update = (account, id) => {
    return db.update(account).where("id", id).table("accounts")
    .then(() => {
        return account;
      });
};

// deletando conta
const deleteItem = (id) => {
    return db.delete().where("id", id).table("accounts")
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