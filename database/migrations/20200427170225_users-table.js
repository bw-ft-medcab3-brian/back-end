
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments('id');
        users.string('email', 50)
            .notNullable()
            .unique()
        users.string('name', 50)
            .notNullable()
        users.string('password', 60)
            .notNullable()
            .unique()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
