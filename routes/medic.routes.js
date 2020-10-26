/*
    Path: /medics
*/
const { Router } = require('express')
const { tokenVerify } = require("../middlewares/users.middlewares");
const {
    getMedics,
    createMedic,
    updateMedic,
    removeMedic,
    getMedic
} = require('../controllers/medic.controllers')

const router = Router();


//Get
router.get('/', getMedics);

//Get un solo medico
router.get('/:id', getMedic);

//post
router.post('/', tokenVerify, createMedic);

//Put
router.put('/:id', tokenVerify, updateMedic);

//Delete
router.delete('/:id', tokenVerify, removeMedic);

module.exports = router;