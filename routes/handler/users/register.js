const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  //CEK ERROR VALIDATE || DEFINE VALIDATION FORM
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6',
    profession: 'string|optional'
  }
  const validate = v.validate(req.body, schema);
  //IF PANJANG VALIDATE LEBIH DARI 0
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  //SEARCH EMAIL IN DATABASE 
  const user = await User.findOne({
    where: { email: req.body.email }
  });

  //JIKA EMAIL SUDAH TERDAFTAR MAKA AKAN MUNCUL OUTPUT CONFLICT
  if (user) {
    return res.status(409).json({
      status: 'error',
      message: 'email already exist'
    });
  }

  //JIKA EMAIL BELUM TERDAFTAR MAKA PASSWORD AKAN DI HASH SEBELUM DI SUBMIT KE DB
  const password = await bcrypt.hash(req.body.password, 10);

  //DATA PREPARATION TO INSERT DATABASE
  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: 'student' //set default
  };

  //POST DATA INSERT TO DB
  const createUser = await User.create(data);

  //OUTPUT JIKA SUKSES
  return res.json({
    status: 'success',
    data: {
      id: createUser.id
    }
  });
}