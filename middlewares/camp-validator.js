const { validationResult } = require("express-validator");

const campValidator = (req, res, next) => {

    const e = validationResult(req);

    if (!e.isEmpty()) {
        return res.status(400).json(
            {
                ok: false,
                errors: e.mapped()
            }
        );
    }

    next();

}



module.exports = {
    campValidator
}