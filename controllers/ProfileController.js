import getStoreProfile from '../usecases/getStoreProfile.js';
import updateStoreProfile from '../usecases/updateStoreProfile.js';

class StoreController {
  async getProfile(req, res, next) {
    try {
      let [records, errorMsg] = await getStoreProfile(req);
      if(errorMsg) return next({
        code: errorMsg,
      });

      return res.status(200).json({
        status: true,
        message: 'PROFILE_FOUND',
        profile: records
      })
    } catch(error) {
      res.status(400).json({
        status: false,
        message: error
      });
    }
  }

  async updateProfile(req, res, next) {
    try {
      // console.log("awal", req.body, req.jwt);
      const update = { body: req.body, jwt: req.jwt };
      let [records, errorMsg] = await updateStoreProfile(update);
      if(errorMsg) return next({
        code: errorMsg,
      });

      return res.status(200).json({
        status: true,
        message: 'PROFILE_HAS_BEEN_UPDATED',
        profile: records
      });
    } catch(error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }
  }
}

export default new StoreController();