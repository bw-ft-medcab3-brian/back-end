
exports.up = function(knex) {
  return knex.schema.createTable("reviews", tbl => {
      tbl.increments();
      tbl.string("strain", 50).notNullable();
      tbl.integer("stars", 5).notNullable();
      tbl.text("review", 1000).notNullable();
      //FK
      tbl.integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
