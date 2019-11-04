const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts').then(acc => {
        res.status(201).json(acc)
    }).catch(err => {
        res.status(500).json({error: 'could not be created'})
    })
})

server.post('/api/accounts', (req, res) => {
    db.insert(req.body, 'id').into('accounts').then(acc => {
        res.status(201).json(acc)
    }) 
    .catch(err => {
        res.status(500).json({error: 'could not be created'})
    })
});

server.put('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id}).update(req.body)
    .then(acc => {
        res.status(200).json(acc)
    })
    .catch(err => {
        res.status(500).json({error: 'user could not be updated'})
    })
})

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id}).del().then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({error: 'Account could not be Deleted'})
    })
})

module.exports = server;