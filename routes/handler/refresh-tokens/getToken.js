const { RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
  //AMBIL DATA REFRESHTOKEN DARI URL PARAMS
  const refreshToken = req.query.refresh_token;
  //AMBIL TOKEN DARI DB UNTUK DICEK DENGAN refreshToken
  const token = await RefreshToken.findOne({
    where: { token: refreshToken }
  });

  if (!token) {
    return res.status(400).json({
      status: 'error',
      message: 'invalid token'
    });
  }

  return res.json({
    status: 'success',
    token
  });

}