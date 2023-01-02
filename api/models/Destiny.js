const db = require("../db/config");

db.schema.hasTable('destinys')
    .then((exists) => {
        if (!exists) {
            return db.schema.createTable('destinys', function(account) {
                account.increments('id').primary();
                account.string('name').notNullable();
                account.timestamp('created_at').defaultTo(db.fn.now());
                account.timestamp('updated_at').defaultTo(db.fn.now());
            }).then(function() {
                console.log('Tabela "destinys" criada com sucesso !');
            });
        };
    });