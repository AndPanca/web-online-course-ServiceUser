const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  /* CHECK VALIDATION FORM */
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6',
    profession: 'string|optional',
    avatar: 'string|optional'
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  //CEK ID DI DATABASE ADA ATAU TIDAK
  const id = req.params.id;
  //CARI DATA ID DARI PRIMARY KEY DI DATABASE
  const user = await User.findByPk(id);
  //ERROR STATUS USER TIDAK DITEMUKAN
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  const email = req.body.email;
  if (email) {
    //Cari email request di database
    const checkEmail = await User.findOne({
      where: { email }
    });
    //CEK JIKA EMAIL SUDAH DIGUNAKAN dan EMAIL TIDAK SAMA DENGAN EMAIL SEBELUMNYA
    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: 'error',
        message: 'email already exist'
      });
    }
  }

  //ENCRYPT PASSWORD HASH  
  const password = await bcrypt.hash(req.body.password, 10);
  //AMBIL NAME,PROF,AVA DARI FORM
  const {
    name, profession, avatar
  } = req.body;

  //UPDATE USER 
  await user.update({
    email,
    password,
    name,
    profession,
    avatar
  });

  return res.json({
    status: 'succes',
    data: {
      id: user.id,
      name,
      email,
      profession,
      avatar
    }
  });
}