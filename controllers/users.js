const User = require('../models/users');
const appError = require('../utils/appError');
const successHandle = require('../utils/successHandle');
const { ImgurClient } = require('imgur');

const userController = {
  getUsers: async (req, res) => {
    const users = await User.find();
    successHandle(res, '成功撈取Users', users);
  },
  userCreate: async (req, res, next) => {
    let { name, age, avatar } = req.body;
    if (!name || !age || !avatar) {
      return appError(400, '欄位未正確填寫', next);
    }
    const currentUser = await User.create({ name, age, avatar });
    const userPayload = {
      id: currentUser._id,
      name: currentUser.name,
      age: currentUser.age,
      avatar: currentUser.avatar,
    };
    return successHandle(res, '成功建立使用者帳號', {
      user: userPayload,
    });
  },
  userDelete: async (req, res, next) => {
    const id = req.params.id;
    if (!id) return appError(400, '無此user');
    const deleteResult = await User.findByIdAndDelete({ _id: id });
    if (!deleteResult) return appError(400, '刪除User失敗', next);
    return successHandle(res, '成功刪除使用者');
  },
  imgUpload: async (req, res, next) => {
    if (!req.files.length) {
      return next(appError(400, '尚未上傳檔案', next));
    }
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENTID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    const response = await client.upload({
      image: req.files[0].buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID,
    });
    return successHandle(res, response.data.link);
  },
};
module.exports = userController;
