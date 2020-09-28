const Anime = require('../models/Anime');
const UserAnime = require('../models/UserAnime');

const animeController = {};

animeController.getAnimes = async (req, res) => {
    try {
        const userAnimeDB = await UserAnime.find({user: req.user_id});
    
        if (!userAnimeDB) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no tiene animes guardados'
            });
        }

        const animesDB = await Anime.find({_id: { $in: userAnimeDB.map(detail => detail.anime)}});
    
        res.status(200).json(animesDB);
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }
}

animeController.getAnimesByStatus = async (req, res) => {

    try {
        const status = req.params.status;
        const userAnimesDB = await UserAnime.find({user: req.user_id, status});


        if (!userAnimesDB) {
            return res.status(404).json({
                ok: false,
                message: `El usuario no tiene animes ${status}`
            });
        }

        const animesDB = await Anime.find({_id: { $in: userAnimesDB.map(detail => detail.anime)}});

        res.status(200).json(animesDB);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }

}

animeController.getAnimeById = async (req, res) => {

    try {
        const userAnimeDB = await UserAnime.findOne({anime: req.params.id, user: req.user_id});
        
        if (!userAnimeDB) {
            return res.status(404).json({
                ok: false,
                message: 'Anime no encontrado'
            });
        }

        const animeDB = await Anime.findById(userAnimeDB.anime);

        res.status(200).json(animeDB);
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }

}

animeController.saveAnime = async (req, res) => {
    try {
        const { title, synopsis, episodes, type, image_url, status } = req.body;
        
        let animeDB = await Anime.findOne({title});
        
        if (!animeDB) {
            const newAnime = new Anime({
                title,
                synopsis,
                episodes,
                image_url,
                type
            });

            animeDB = await newAnime.save();
        }

        const userAnimeDB = await UserAnime.findOne({user: req.user_id, anime: animeDB._id});

        if (userAnimeDB) {
            return res.status(400).json({
                ok: false,
                message: 'El anime ya fue guardado'
            });
        }

        const newDetail = new UserAnime({
            user: req.user_id,
            anime: animeDB._id,
            status
        });

        await newDetail.save();

        res.status(200).json({
            ok: true,
            message: 'Anime guardado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }

}

animeController.updateAnime = async (req, res) => {

    try {

        const { status } = req.body;

        const userAnimeDB = await UserAnime.findOneAndUpdate({anime: req.params.id}, {status});

        if (!userAnimeDB) {
            return res.status(400).json({
                ok: false,
                message: 'Anime a actualizar no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Anime actualizado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }

    res.send('Anime Actualizado');
}

animeController.deleteAnime = async (req, res) => {
    try {

        const deletedAnime = await UserAnime.findOneAndDelete({user: req.user_id, anime: req.params.id});

        if (!deletedAnime) {
            return res.status(400).json({
                ok: false,
                message: 'Anime a eliminar no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Anime eliminado'
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        })
    }
}

module.exports = animeController;