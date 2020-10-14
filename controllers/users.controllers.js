const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { request, response } = require('express');

//Obtener usuarios
const getUsers = (req, res) => {

    User.find((err, usersDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: usersDB
        })
    })

}

//Crear usuarios
const createUser = (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 13);

    const user = new User(req.body);

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })

    });

}

//actualizar usuarios
const updateUser = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['password', 'name', 'role', 'img']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
}

//borrar usuario
const removeUser = (req = request, res = response) => {
    let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         user: userDB
    //     })
    // });

    User.findByIdAndUpdate(id, { state: false }, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    });


}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    removeUser
}