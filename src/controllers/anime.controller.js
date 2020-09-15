const Anime = require('../models/Anime');
const User = require('../models/User');

const animeController = {};

animeController.getUserAnimes = async (req, res) => {
    try {
        const animes = await Anime.find({users: req.user_id});
    
        if (!animes) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no tiene animes guardados'
            });
        }
    
        res.status(200).json(animes);
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }
}

animeController.getUserAnimeById = async (req, res) => {

    try {
        const anime = await Anime.findOne({_id: req.params.id, users: req.user_id});
        
        if (!anime) {
            return res.status(404).json({
                ok: false,
                message: 'Anime no encontrado'
            });
        }

        res.status(200).json(anime);
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }

}

animeController.saveUserAnime = async (req, res) => {
    try {
        const { title, synopsis, episodes, type, image_url } = req.body;
    
        const anime = await Anime.findOne({title});
    
        if (anime) {
    
            if (anime.users.includes(req.user_id)) {
                return res.status(400).json({
                    ok: false,
                    message: 'El anime ya fue guardado'
                });
            }
    
            await Anime.findByIdAndUpdate(anime._id, {$push: {users: req.user_id}});
            await User.findByIdAndUpdate(req.user_id, {$push: {animes: anime._id}});
            
        } else {
            const newAnime = new Anime({
                title,
                synopsis,
                episodes,
                image_url,
                type,
                users: [req.user_id]
            });
        
            const savedAnime = await newAnime.save();
        
            await User.findByIdAndUpdate(req.user_id, {$push: {animes: savedAnime._id}});
        }
    
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

animeController.deleteUserAnime = async (req, res) => {
    try {
        const deletedUserFromAnime = await Anime.findByIdAndUpdate(req.params.id, {$pull: {users: req.user_id}});
        const deleteAnimeFromUser = await User.findByIdAndUpdate(req.user_id, {$pull: {animes: req.params.id}});

        if (!deleteAnimeFromUser || !deletedUserFromAnime) {
            return res.status(404).json({
                ok: false,
                message: 'Anime a eliminar no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Anime eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        })
    }
}

module.exports = animeController;