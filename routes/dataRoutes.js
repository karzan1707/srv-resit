// routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const { validateBodyFields, validateEmailFormat, emailAlreadyRegistered, storages, getData, update, deleteUser, validateBodyFieldspp, validateEmailFormatpp, storagepp, fetchimg, validateEmailFormat2, visiblefetchimg, imgupdate, visupdate} = require('../controllers/dataController');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

router.post('/register', upload.none(), validateBodyFields, validateEmailFormat, emailAlreadyRegistered, storages);
router.get('/register', getData);
router.put('/register', upload.none(), validateBodyFields, validateEmailFormat, update);
router.delete('/register', upload.none(), deleteUser);

router.post('/picture', upload.single('img'), validateBodyFieldspp, validateEmailFormat, storagepp);
router.get('/picture/:email', upload.none(),validateEmailFormat2, fetchimg);
router.get('/picture/visible/:email', upload.none(),validateEmailFormat2, visiblefetchimg);
router.put('/picture/:id', upload.single('img'),validateBodyFieldspp,validateEmailFormat, imgupdate);
router.put('/picture/visible/:visible/:id', upload.none(), visupdate);



module.exports = router;
