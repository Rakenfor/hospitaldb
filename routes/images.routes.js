/*
    Path: /image
*/

const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();

router.get('/:type/:img', (req, res) => {
    let type = req.params.type;
    let nameImg = req.params.img;

    let pathImage = path.resolve(__dirname, `../uploads/${type}/${nameImg}`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        res.status(400).json({
            ok: false,
            err: {
                message: 'La imagen no existe'
            }
        })
    }

});

module.exports = router;