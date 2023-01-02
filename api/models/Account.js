const db = require("../db/config");

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
            }).then(function() {
                console.log('Tabela "accounts" criada com sucesso!');
            });
        };
    });