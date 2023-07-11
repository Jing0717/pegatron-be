var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const handleImg = require('../middleware/handleImg');

router.get('/', handleErrorAsync(userController.getUsers));
router.post('/', handleErrorAsync(userController.userCreate));
router.post('/upload', handleImg, handleErrorAsync(userController.imgUpload));
router.delete('/:id', handleErrorAsync(userController.userDelete));

module.exports = router;
