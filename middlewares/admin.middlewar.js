const { request, response } = require('express');

verifyAdmin = (req = request, res = response, next) => {

    let id = req.params.id
    console.log(req.user);

    if (req.user.role === "ADMIN_ROLE" || req.user._id === id) {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Usted no esta autorizado para esto"
            }
        })
    }

}

module.exports = {
    verifyAdmin
}