const Router = require('express');

const { getAllAirports, getAirportsId, createAirport, updateAirport, deleteAirport } = require('../schema/mutations')

const router = Router()


router.get('/airports', getAllAirports);
router.get('/airport/:id', getAirportsId);
router.post('/add', createAirport);
router.put('/update', updateAirport);
router.delete('/delete', deleteAirport);



module.exports = router;