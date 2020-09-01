//CALL MODELS
const {
  User,
  RefreshToken
} = require('../../../models');

const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  //AMBIL DATA user_id dan token DARI FORM 
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  //CEK VALIDATION DATA
  const schema = {
    refresh_token: 'string',
    user_id: 'number',

  }

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  //JIKA SUKSES AKAN CEK USER ID ADA ATAU TIDAK DI DB
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  //SIMPAN TOKEN KE DB REFRESHTOKEN
  const createdRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userId
  });

  return res.json({
    status: 'success',
    data: {
      id: createdRefreshToken.id
    }
  });
}