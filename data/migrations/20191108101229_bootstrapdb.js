
exports.up = function(knex) {
    return knex.schema.createTable('project', tbl => {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.string('description', 255);
        tbl.boolean('completed', false).notNullable();
    })
    .createTable('resource', tbl => {
        tbl.increments();
        tbl.string('name').unique().notNullable();
        tbl.string('description', 255);
    })
    .createTable('task', tbl => {
        tbl.increments();
        tbl.string('description').notNullable();
        tbl.string('notes');
        tbl.boolean('completed', false).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project', 'resource', 'task')
};
