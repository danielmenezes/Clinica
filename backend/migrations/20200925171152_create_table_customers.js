
exports.up = function(knex) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').unique()
        table.string('mother').notNull()
        table.string('age').notNull()
        table.string('phone')
        table.string('sex').notNull()
        table.string('street')
        table.string('number')
        table.string('city')
        table.string('uf')
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers')
};
