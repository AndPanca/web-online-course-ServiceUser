const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  /* CEK ERROR VALIDATE */
  const schema = {
    email: 'email|empty:false',
    password: 'string|min:6'
  }

  //VALIDATE FORM REQ DAN SCHEMA
  const validate = v.validate(req.body, schema);

  //IF PANJANG VALIDATE LEBIH DARI 0
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  /* CEK USER EMAIL ADA TIDAK DI DATABASE */
  const user = await User.findOne({
    where: { email: req.body.email }
  });

  //USER NOT FOUND
  if (!user) {
    //404 NOT FOUND
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  /* CEK VALIDATE PASSWORD */
  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  //compare() => MEMBANDINGKAN SEBUAH STRING PASS DENGAN HASIL HASH BCRYPT
  //compare(password form, password hash bcrypt database)
  if (!isValidPassword) {
    //404 NOT FOUND
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  /* SUCCESS RESPONSE JIKA SEMUA VALID*/
  res.json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profession: user.profession
    }
  });
}
