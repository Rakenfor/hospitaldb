const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const hospitalSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    img: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    }

});

hospitalSchema.plugin(uniqueValidator, { message: '{PATH} deve ser unico' });

module.exports = model('Hospital', hospitalSchema);