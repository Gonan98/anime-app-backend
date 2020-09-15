const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {};

authController.signUp = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            auth: false,
            message: 'Faltan datos'
        });
    }

    const user = await User.findOne({
        username,
        email
    });

    if (user) {
        return res.status(400).json({
            auth: false,
            message: 'El usuario o email ya existen'
        })
    }

    const newUser = new User({
        username,
        email,
        password
    });

    newUser.password = newUser.encryptPassword(newUser.password);
    await newUser.save();

    res.status(201).json({
        auth: true,
        message: 'Se registró correctamente'
    });
};

authController.signIn = async (req, res) => { 

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            auth: false,
            message: 'Faltan datos'
        });
    }

    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).json({
            auth: false,
            message: 'Usuario o contraseña incorrectos'
        });
    }

    const isCorrect = user.validatePassword(password);

    if(!isCorrect) {
        return res.status(400).json({
            auth: false,
            message: 'Usuario o contraseña incorrectos'
        });
    }

    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET || 'mysecrettoken', {
        expiresIn: 3600
    })

    res.status(200).json({
        auth: true,
        token
    });

};

authController.getPofile = async (req, res) => {

    const user = await User.findById(req.user_id, {password: 0}).populate('animes','-users');
    //console.log(user);
    if(!user) {
        return res.status(404).json({
            ok: false,
            message: 'Usuario no encontrado'
        });
    }
    res.status(200).json(user);

}

module.exports = authController;
