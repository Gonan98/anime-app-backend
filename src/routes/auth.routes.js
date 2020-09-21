const { Router } = require("express");
const router = Router();

const authController = require('../controllers/auth.controller');
const {verifyToken} = require('../middlewares/authentication');

router.post('/api/signup', authController.signUp);
router.post('/api/signin', authController.signIn);
router.get('/api/profile', verifyToken, authController.getPofile);
router.put('/api/profile', verifyToken, authController.editProfile);

module.exports = router;