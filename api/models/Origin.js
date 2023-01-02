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
            }).then(function() {
                console.log('Tabela "origins" criada com sucesso!');
            });
        };
    });

