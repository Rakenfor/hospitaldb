const { Schema, model } = require('mongoose');

const medicSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    img: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del usuario es necesario']
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'El id del hospital es necesario']
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = model('Medic', medicSchema);