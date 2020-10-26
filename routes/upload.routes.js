/*
    Path: upload
*/

const { Router, json } = require('express');
const { tokenVerify } = require('../middlewares/users.middlewares')
const path = require('path')
const fs = require('fs');

const Hospital = require('../models/hospital.model')
const Medic = require('../models/medic.model')
const User = require('../models/user.model')

const router = Router();


router.put('/:type/:id', tokenVerify, (req, res) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No a seleccionado nada'
            }
        });
    }

    let type = req.params.type;
    let id = req.params.id;
    let file = req.files.file;
    let fileCut = file.name.split('.');
    let extention = fileCut[fileCut.length - 1];

    let permit = ['jpg', 'png', 'gif', 'jpeg'];
    let collections = ['hospital', 'medic', 'user'];

    if (permit.indexOf(extention) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Extención no valida',
                validas: permit.toString()
            }
        });
    }

    if (collections.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Tipo no válido',
                validas: collections.toString()
            }
        });
    }

    let fileName = `${id}${new Date().getMilliseconds()}.${extention}`;

    let pathSave = path.resolve(__dirname, `../uploads/${type}`);

    file.mv(`${pathSave}/${fileName}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (type === 'hospital') {
            Hospital.findById(id, (err, hospitalDB) => {
                if (err) {
                    removeFile(type, fileName)
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!hospitalDB) {
                    removeFile(type, fileName)
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El id no es valido'
                        }
                    })
                }

                if (hospitalDB.img) {
                    removeFile(type, hospitalDB.img)
                }

                hospitalDB.img = fileName;
                hospitalDB.save((err, hospitalDB) => {
                    if (err) {
                        removeFile(type, fileName)
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                    res.json({
                        ok: true,
                        hospital: hospitalDB
                    })

                });
            });


        } else if (type === 'user') {
            User.findById(id, (err, userDB) => {
                if (err) {
                    removeFile(type, fileName)
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!userDB) {
                    removeFile(type, fileName)
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El id no es valido'
                        }
                    })
                }

                if (userDB.img) {
                    removeFile(type, userDB.img)
                }

                userDB.img = fileName;
                userDB.save((err, userDB) => {
                    if (err) {
                        removeFile(type, fileName)
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                    res.json({
                        ok: true,
                        user: userDB
                    })

                });
            });
        } else if (type === 'medic') {
            Medic.findById(id, (err, medicDB) => {
                if (err) {
                    removeFile(type, fileName)
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!medicDB) {
                    removeFile(type, fileName)
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El id no es valido'
                        }
                    })
                }

                if (medicDB.img) {
                    removeFile(type, medicDB.img)
                }

                medicDB.img = fileName;
                medicDB.save((err, medicDB) => {
                    if (err) {
                        removeFile(type, fileName)
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                    res.json({
                        ok: true,
                        medic: medicDB
                    })

                });
            });

        }

    });


});

function removeFile(type, nameImg) {
    let pathImage = path.resolve(__dirname, `../uploads/${type}/${nameImg}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = router