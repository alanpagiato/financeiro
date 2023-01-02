const db = require("../db/config");

    db.schema.hasTable('chartaccounts').then(function(exists) {
        if (!exists) {
            return db.schema.createTable('chartaccounts', function(table) {
                table.increments('id').primary();
                table.string('description').notNullable();
                table.timestamp('created_at').defaultTo(db.fn.now());
                table.timestamp('updated_at').defaultTo(db.fn.now());
            }).then(function() {
                console.log('Tabela "chartAccounts" criada com sucesso');
                return db.schema.hasTable('subChartAccounts').then(function(exists) {
                if (!exists) {
                    return db.schema.createTable('subChartAccounts', function(table) {
                    table.increments('id').primary();
                    table.string('description').notNullable();
                    table.integer('parent_id').unsigned().notNullable();
                    table.timestamp('created_at').defaultTo(db.fn.now());
                    table.timestamp('updated_at').defaultTo(db.fn.now());
                    table.foreign('parent_id').references('chartAccounts.id');
                    }).then(function() {
                    console.log('Tabela "subChartAccounts" criada com sucesso');
                    });
                }
                });
            });
        }
});

