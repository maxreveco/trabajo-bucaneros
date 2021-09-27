const { json } = require('express');
const Pirate = require('../model/pirate.model');

module.exports.crear = (req, res) => {
    Pirate.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.editar = (req, res) => {
    Pirate.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.eliminar = (req,res) => {
    Pirate.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.listar = (req, res) => {
    Pirate.find().sort({name: 1}) //Ordena alfabeticamente ascendente
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.buscarPorId = (req, res) => {
    Pirate.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}



