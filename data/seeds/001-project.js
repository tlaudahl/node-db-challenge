
exports.seed = function(knex) {
      return knex('project').insert([
        {name: 'Sprint Challenge', description: 'End of week challenge ', completed: false},
        {name: 'Build Week', description: 'A week to build a project using everything we learned over the past month', completed: false},
        {name: 'Daily Project', description: 'Project to work on after the lecture to reinforce what we learned that day', completed: false}
      ]);
};
