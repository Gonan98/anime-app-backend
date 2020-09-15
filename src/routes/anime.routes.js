const { Router } = require("express");
const router = Router();
const animeController = require("../controllers/anime.controller");
const {verifyToken} = require('../middlewares/authentication');

router.get('/api/animes', verifyToken, animeController.getUserAnimes);
router.post('/api/animes', verifyToken, animeController.saveUserAnime);

router.get('/api/animes/:id', verifyToken, animeController.getUserAnimeById);
router.delete('/api/animes/:id', verifyToken, animeController.deleteUserAnime);

module.exports = router;