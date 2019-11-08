
exports.seed = function(knex) {
      return knex('resource').insert([
        { name: 'Stackoverflow', description: 'https://stackoverflow.com/' },
        { name: 'Training Kit', description: 'https://learn.lambdaschool.com/course/cs-fsw' },
        { name: 'MDN Docs', description: 'https://developer.mozilla.org/en-US/' }
      ]);
};
