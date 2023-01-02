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
            }).then(function() {
                console.log('Tabela "paymentMethods" criada com sucesso!');
            });
        }
    });