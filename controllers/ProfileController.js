import Profile from '../models/ProfileToko.js';

class profileController {
    async getProfile(req, res) {
        try {
            if(!req.body.idToko) throw {
                code: 400,
                message: 'ID_TOKO_REQUIRED_FOR_PROFILE'
            }
            if(!req.body.namaToko) throw {
                code: 400,
                message: 'NAMA_TOKO_REQUIRED_FOR_PROFILE'
            }

            const userProfile = await Profile.findAll({
                where: {
                    idToko: req.body.idToko,
                    namaToko: req.body.namaToko
                }
            });

            return res.status(200).json({
                status: true,
                message: 'PROFILE_FOUND',
                userProfile
            })
        } catch(error) {
            res.status(400).json({
                status: false,
                message: error
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const payload = req.body;

            const updateProfile = await Profile.update(payload, {
                where: {
                    idToko: req.body.idToko
                }
            });

            const latestProfile = await Profile.findOne({
                where: {
                    idToko: req.body.idToko
                }
            });

            return res.status(200).json({
                status:true,
                message: 'PROFILE_HAS_BEEN_UPDATED',
                profile: latestProfile
            });
        } catch(error) {
            return res.status(400).json({
                status: false,
                message: error
            });
        }
    }
}

export default new profileController();