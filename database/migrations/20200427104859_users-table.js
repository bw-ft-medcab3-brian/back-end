
exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
      users.increments();

      users.string("email")
        .notNullable()
        .unique();
      users.string("name")
        .notNullable();
      users.string("password")
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
