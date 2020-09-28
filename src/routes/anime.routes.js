const { Router } = require("express");
const router = Router();
const animeController = require("../controllers/anime.controller");
const {verifyToken} = require('../middlewares/authentication');

router.get('/api/animes', verifyToken, animeController.getAnimes);
router.post('/api/animes', verifyToken, animeController.saveAnime);
router.get('/api/animes/status/:status', verifyToken, animeController.getAnimesByStatus);
router.get('/api/animes/:id', verifyToken, animeController.getAnimeById);
router.put('/api/animes/:id', verifyToken, animeController.updateAnime);
router.delete('/api/animes/:id', verifyToken, animeController.deleteAnime);

module.exports = router;