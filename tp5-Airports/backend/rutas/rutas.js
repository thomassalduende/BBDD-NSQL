const Router = require('express');

const { getAllAirports, getAirportsId, createAirport, updateAirport, deleteAirport } = require('../schema/mutations')

const router = Router()


router.get('/airports', getAllAirports);
router.get('/airport/:id', getAirportsId);
router.post('/add', createAirport);
router.put('/update/:id', updateAirport);
router.delete('/delete/:id', deleteAirport);



module.exports = router;