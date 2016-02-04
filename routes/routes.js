var express = require('express');
var Controller = require('../controllers/controllers');
var router = express.Router();


//post a new tournament
router.post('/tournament', Controller.postTournament);

router.get('/tournament', Controller.getList);

router.delete('/tournament', Controller.deleteTournaments); //later need to add to delete only specific _id

router.get('/tournament/:id', Controller.getTournament);

router.delete('/tournament/:id', Controller.deleteTournament); 
    //************Problem********************
    //sometimes deleting multiple tournaments too quickly crashes the server due to name being null
    //need to add async logic.
    //************Resolution*****************
    //

router.put('/tournament/:id', Controller.updateTournament);

//router.get('/user/:userid', Controller.getUserID);

module.exports = router;