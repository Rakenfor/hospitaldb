const { request, response } = require('express');
const Hospital = require('../models/hospital.model')
const Medic = require('../models/medic.model')
const User = require('../models/user.model')

//Busqueda entre todas las colecciones
generalSearch = (req = request, res = response) => {

    let item = req.params.item;

    let regex = new RegExp(item, 'i');

    Promise.all([searchUsers(regex), searchHospitals(regex), searchMedics(regex)])
        .then((data) => {
            res.json({
                ok: true,
                results: {
                    users: data[0].users,
                    hospitals: data[1].hospitals,
                    medics: data[2].medics
                }
            })
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            })
        })
}

//Busqueda por coleccion
collectionSearch = (req = request, res = response) => {
    let collection = req.params.collection;
    let item = req.params.item;

    let regexp = new RegExp(item, 'i');

    if (collection === 'users') {
        searchUsers(regexp).then((users) => {
            res.json({
                ok: true,
                users: users.users
            })
        })
    } else if (collection === 'hospitals') {
        searchHospitals(regexp).then((hospitals) => {
            res.json({
                ok: true,
                hospitals: hospitals.hospitals
            })
        })
    } else if (collection === 'medics') {
        searchMedics(regexp).then((medics) => {
            res.json({
                ok: true,
                medics: medics.medics
            })
        })
    } else {
        res.status(400).json({
            ok: false,
            err: {
                message: 'Coleccion inxesistente'
            }
        })
    }

}

searchUsers = (regex) => {
    return new Promise((resolve, reject) => {
        User.find({ name: regex, state: true })
            .exec((err, usersDB) => {
                if (err) {
                    reject({
                        ok: false,
                        err
                    })
                }

                resolve({ users: usersDB });
            });
    });
}

searchHospitals = (regex) => {
    return new Promise((resolve, reject) => {
        Hospital.find({ name: regex, state: true })
            .exec((err, HospitalsDB) => {
                if (err) {
                    reject({
                        ok: false,
                        err
                    })
                }

                resolve({ hospitals: HospitalsDB });
            });
    });
}

searchMedics = (regex) => {
    return new Promise((resolve, reject) => {
        Medic.find({ name: regex, state: true })
            .populate('user')
            .populate('hospital')
            .exec((err, MedicsDB) => {
                if (err) {
                    reject({
                        ok: false,
                        err
                    })
                }

                resolve({ medics: MedicsDB });
            });
    });
}

module.exports = {
    generalSearch,
    collectionSearch
}