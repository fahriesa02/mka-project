import Stores from "../models/Stores.js";
import storeSetting from "../usecases/storeSetting.js";


class SettingController {
  async getStoreSetting(req, res, next) {
    try {
      // console.log(req);
      let [setting, errorMsg] = await storeSetting(req);
      if(errorMsg) return next({
        code: errorMsg,
      });

      return res.status(200).json({
        status: true,
        message: 'PROFILE_FOUND',
        profile: setting,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error,
      });
    }
  }
}

export default new SettingController();