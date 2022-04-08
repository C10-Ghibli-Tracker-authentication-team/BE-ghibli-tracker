const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const upload = multer({
    dest: 'public/files/'
})

router.post('/signup', async function (req, res) {
    try {
        const data = await controller.addUser(req.body)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, 'Internal Error', 500, error)
    }
})

router.post('/login', async function (req, res) {
    try {
        const data = await controller.findUser(req.body)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, 'Internal Error', 500, error)
    }
})

module.exports = router;