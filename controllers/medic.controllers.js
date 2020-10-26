const Medic = require('../models/medic.model');
const { request, response } = require('express');
const _ = require('underscore');


//Obtener medicos
getMedics = (req = request, res = response) => {

    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 10;

    Medic.find({ state: true })
        .populate('user')
        .populate('hospital')
        .skip(skip)
        .limit(limit)
        .exec((err, medicsDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                medics: medicsDB
            })

        });
}

getMedic = (req = request, res = response) => {
    let id = req.params.id;
    Medic.find({ _id: id })
        .populate('user')
        .populate('hospital')
        .exec((err, medicDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                medic: medicDB
            })

        });
}

//Crear medico
createMedic = (req = request, res = response) => {

    let medic = new Medic(req.body);
    medic.user = req.user._id;

    medic.save((err, medicDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            medic: medicDB
        })
    })

}

//Actualizar medico
updateMedic = (req = request, res = response) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'hospital']);
    body.user = req.user._id;

    Medic.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, medicDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!medicDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Requisitos invalidos'
                }
            })
        }

        res.json({
            ok: true,
            medic: medicDB
        })

    });
}

//ELiminar medico
removeMedic = (req = request, res = response) => {

    let id = req.params.id;

    Medic.findByIdAndUpdate(id, { state: false }, { new: true, runValidators: true }, (err, medicDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!medicDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Requisitos invalidos'
                }
            })
        }

        res.json({
            ok: true,
            medic: medicDB
        })

    });
}


module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    removeMedic,
    getMedic
}