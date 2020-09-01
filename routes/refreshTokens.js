const express = require('express');
const router = express.Router();

//ROUTING HANDLER REFRESH TOKEN
const refreshTokensHandler = require('./handler/refresh-tokens')

router.post('/', refreshTokensHandler.create);
router.get('/', refreshTokensHandler.getToken);

module.exports = router;
