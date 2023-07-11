const mongoose = require('mongoose');

const userSchema = {
  name: {
    type: String,
    required: [true, '名稱為必要資訊'],
    minLength: [1, '名稱請大於 1 個字'],
    maxLength: [50, '名稱長度過長，最多只能 50 個字'],
  },
  age: {
    type: Number,
    required: [true, '年齡為必要資訊'],
    max: [150, '年齡不得超過 150 歲'],
  },
  avatar: {
    type: String,
    default: 'https://i.imgur.com/lMlmOj2.png',
    validate: {
      validator: function (v) {
        // 使用正則表達式來驗證 URL
        var regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        return regex.test(v);
      },
      message: '請輸入有效的圖片 URL',
    },
  },
};

const User_Schema = new mongoose.Schema(userSchema, {
  versionKey: false,
});

const Users = mongoose.model('Users', User_Schema);

module.exports = Users;
