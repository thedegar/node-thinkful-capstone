var express = require('express');
var Tournament = require('../controllers/tournaments');
var router = express.Router();


//post a new tournament
router.post('/tournament', Tournament.postTournament);

router.get('/tournament', Tournament.getList);

router.delete('/tournament', Tournament.deleteTournaments); //later need to add to delete only specific _id

router.get('/tournament/:id', Tournament.getTournament);

router.delete('/tournament/:id', Tournament.deleteTournament); 
    //************Problem********************
    //sometimes deleting multiple tournaments too quickly crashes the server due to name being null
    //need to add async logic.
    //************Resolution*****************
    //

router.put('/tournament/:id', Tournament.updateTournament);

module.exports = router;