const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/resources', (req, res) => {
    db('resource')
    .then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({ error: "Could not retrieve resources from the database" }))
})

server.post('/api/resources', (req,res) => {
    if(!req.body.name) {
        res.status(400).json({ error: "Please include a name for the resource" })
    } else {
        db('resource')
        .insert(req.body)
        .then(ids => {
            const id = ids[0]

            db('resource')
            .where({ id })
            .first()
            .then(resource => res.status(201).json(resource))
        })
        .catch(err => res.status(500).json({ error: "Could not add the resource to the database" }))
    }
})

server.get('/api/projects', (req, res) => {
    db('project')
    .then(projects => {
        projects.forEach(project => {
            if(project.completed === 0) {
                project.completed = false
            } else {
                project.completed = true;
            }
        })
        res.status(200).json(projects)
    })
    .catch(err => res.status(500).json({ error: "Could not retrieve projects from the database" }))
})

server.post('/api/projects', (req,res) => {
    if(!req.body.name) {
        res.status(400).json({ error: "Please include a name for this project" })
    } else if (!req.body.completed) {
        res.status(400).json({ error: "Please indicate if the project is completed or not"})
    } else {
        db('project')
        .insert(req.body)
        .then(ids => {
            const id = ids[0]
            db('project')
            .where({ id })
            .first()
            .then(project => res.status(201).json(project))
        })
        .catch(err => res.status(500).json({ error: "Could not add the project to the database" }))
    }
})

server.get('/api/tasks', (req, res) => {
    db('task')
    .then(tasks => {
        tasks.forEach(task => {
            if(task.completed === 0) {
                task.completed = false
            } else {
                task.completed = true;
            }
        })
        res.status(200).json(tasks)
    })
    .catch(err => res.status(500).json({ error: "Could not retrieve tasks from the database" }))
})

server.post('/api/tasks', (req, res) => {
    if(!req.body.description) {
        res.status(400).json({ error: "Please include a description for the task" })
    } else if (!req.body.completed) {
        res.status(400).json({ error: "Please indicate if the task is completed" })
    } else {
        db('task')
        .insert(req.body)
        .then(ids => {
            const id = ids[0]

            db('task')
            .where({ id })
            .first()
            .then(task => res.status(201).json(task))
        })
        .catch(err => res.status(500).json({ error: "Could not add the task to the database" }))
    }
})

module.exports = server;