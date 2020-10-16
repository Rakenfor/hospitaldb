const { request, response } = require('express');
const Hospital = require('../models/hospital.model')
const _ = require('underscore');

//obtener Hospitales
getHospitals = (req = request, res = response) => {

    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 10;

    Hospital.find()
        .populate('user')
        .skip(skip)
        .limit(limit)
        .exec((err, hospitalsDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                hospital: hospitalsDB
            });
        });
}

//Crear hospital
createHospital = (req = request, res = response) => {

    let body = req.body;

    body.user = req.user._id;

    const hospital = new Hospital(body);

    hospital.save((err, hospitalDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            hospital: hospitalDB
        });

    });

}

//Actualizar hospital
updateHospital = (req = request, res = response) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'user']);
    body = req.user._id

    //Error en run vaulidators
    Hospital.findByIdAndUpdate(id, body, { new: true }, (err, hospitalDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Requisitos invalidos'
                }
            })
        }

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    });


}

//Eliminar hospital
removeHospital = (req = request, res = response) => {
    let id = req.params.id;
    Hospital.findByIdAndUpdate(id, { state: false }, { new: true }, (err, hospitalDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Requisitos invalidos'
                }
            })
        }

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    });
}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    removeHospital
}