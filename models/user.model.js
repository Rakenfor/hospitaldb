const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']

    },
    email: {
        type: String,
        required: true,
        unique: [true, 'El email, es necesario']

    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']

    },
    img: {
        type: String

    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    }

});

//Eliminando contraseña
userSchema.methods.toJSON = function() {

    //Tambien se puede hacer
    //const { __v, ...object } = this.toObject();
    //y se regresa lo que se desea 

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} deve ser unico' })

module.exports = model('User', userSchema);