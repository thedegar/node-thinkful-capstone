var express = require('express');
var Tournament = require('../controllers/tournaments');
var router = express.Router();


//post a new tournament
router.post('/tournament', Tournament.postTournament);

router.get('/tournament', Tournament.getList);

router.delete('/tournament', Tournament.deleteTournaments); //later need to add to delete only specific _id

router.get('/tournament/:id', Tournament.getTournament);

/************Add HTTP routes below******************

get an existing tournament

put (update) an existing tournament

delete an existing tournament

********below were from thinkful shopping list project**********

router.get('/items', Item.getList);

router.post('/items', Item.postItem);

router.delete('/items/:id', Item.deleteItem);

router.put('/items/:id', Item.updateItem);
*/


module.exports = router;