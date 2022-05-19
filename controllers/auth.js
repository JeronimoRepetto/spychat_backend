const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const user = require("../models/user");


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email error'
            });
        }
        const user = new User(req.body);

        //encrypt pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //JSON WEB TOKEN
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            userDB: user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //mail validation
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credential error'
            });
        }

        //pass validation
        const validPass = bcrypt.compareSync(password, userDB.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Credential error'
            });
        }
        //Genereate JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok:true,
            userDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

//New Token
const renewToken = async(req,res = response)=>{
    const uid = req.uid;
    const token = await generateJWT(uid);
    const userDB = await User.findById(uid);

    res.json({
        ok:true,
        userDB,
        token
    })

}

module.exports = {
    createUser,
    login,
    renewToken
}