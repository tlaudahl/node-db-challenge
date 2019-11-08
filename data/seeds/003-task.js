
exports.seed = function(knex) {
      return knex('task').insert([
        {description: 'Write an API', notes: 'Previous Projects', completed: false},
        {description: 'Create a database', notes: 'use knex migrations and seeds', completed: false},
        {description: 'Design a database', notes: 'use dbdesigner.com', completed: false}
      ]);
};