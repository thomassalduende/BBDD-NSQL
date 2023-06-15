const Router = require('express');

const { getAllAirports } = require('../schema/mutations')

const router = Router()


router.get('/airports', getAllAirports)


module.exports = router;