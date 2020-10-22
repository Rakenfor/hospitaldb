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
        res.sendFile(path.resolve(__dirname, '../uploads/no-found.png'));
    }

});

module.exports = router;