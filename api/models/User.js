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
            }).then(function() {
                console.log('Tabela "users" criada com sucesso!');
            });
        };
    });