const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "El nombre del pirata es requerido para guardar registro"]
    },
    imageUrl:{
        type:String,
        required: [true, "El link de la imagen del pirata es requerido para guardar registro"]
    },
    numberTreasures:{
        type:Number,
        required: [true, "El numero de tesoros del pirata es requerido para guardar registro"]
    },
    catchPhrase:{
        type:String,
        required: [true, "La frase tipica del pirata es requerido para guardar registro"]
    },
    crewPosition:{
        type:String,
        required: [true, "La posicion dentro del barco del pirata es requerido para guardar registro"]
    },
    pegLeg:{
        type:Boolean,
        required: [true, "La caracteristica no puede estar vacia"]
    },
    eyePatch:{
        type:Boolean,
        required: [true, "La caracteristica no puede estar vacia"]
    },
    hookHand:{
        type:Boolean,
        required: [true, "La caracteristica no puede estar vacia"]
    },
}, { timestamps:true })

const Pirate = mongoose.model('Pirate', PirateSchema);
module.exports = Pirate;

