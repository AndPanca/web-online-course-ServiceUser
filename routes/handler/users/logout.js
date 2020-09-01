const {
  User,
  RefreshToken
} = require('../../../models');

module.exports = async (req, res) => {
  //GET PARAMETER DARI BODY
  const userId = req.body.user_id;
  //CEK userId DI DATABASE
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  //DELETE TOKEN by user_id atau userId
  await RefreshToken.destroy({
    where: { user_id: userId }
  });

  return res.json({
    status: 'success',
    message: 'refresh token deleted'
  });
}