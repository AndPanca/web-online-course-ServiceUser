const { User } = require('../../../models');

module.exports = async (req, res) => {
  //AMBIL ID DARI URL
  const id = req.params.id;

  //CARI DATA BERDASARKAN ID DAN ATRIBUT
  const user = await User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  return res.json({
    status: 'success',
    data: user
  });
}