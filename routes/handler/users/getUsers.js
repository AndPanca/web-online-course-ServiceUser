const { User } = require('../../../models');

module.exports = async (req, res) => {
  //AMBIL QUERY PARAMS DARI URL ID YANG AKAN DIFILTER UNTUK DITAMPILKAN
  const userIds = req.query.user_ids || [];

  //OPTION ATTRIBUTES
  const sqlOptions = {
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
  }

  //FILTER DATA ID YANG AKAN TITAMPILKAN DARI REQUEST
  if (userIds.length) {
    sqlOptions.where = {
      id: userIds
    }
  }

  //MENAMPILKAN SEMUA DATA ID
  const users = await User.findAll(sqlOptions);

  return res.json({
    status: 'success',
    data: users
  });
}