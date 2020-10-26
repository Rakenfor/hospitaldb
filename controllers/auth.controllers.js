const { request, response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


const login = (req = request, res = response) => {


    let body = req.body;

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Email y contraseña son requeridos'
            }
        });
    }


    User.findOne({ 'email': body.email }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El (email) o contraseña no son validos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El email o (contraseña) no son validos'
                }
            });

        }

        let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: '48h' });

        res.json({
            ok: true,
            user: userDB,
            token,
            menu: getMenu(userDB.role)
        })

    });

}

getMenu = (ROLE) => {
    let menu = [{
            title: 'Principal',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Dasboard', url: '/dashboard' },
                { title: 'progress', url: '/progress' },
                { title: 'Graphics', url: '/graphics1' },
                { title: 'Promesas', url: '/promesas' },
                { title: 'rxjs', url: '/rxjs' }
            ]
        },
        {
            title: 'Matenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                { title: 'Médicos', url: '/medics' },
                { title: 'Hospitales', url: '/hospitals' },
            ]
        }
    ];

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: '/users' });
    }
    console.log(ROLE);

    return menu;
}

module.exports = {
    login
}