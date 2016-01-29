//////////////////////////////////////////////
// Created by Tyler Hedegard
// on 1/27/2016
// Thinkful.com Node JS Capstone Project
//////////////////////////////////////////////

$(document).ready(function() {
    var teamCount = 8;
    var teamList = [];
    
    var getTeams = function() {
        var count = $(".teams").length;
        teamList = []; //reset team list
        for (var i=1; i <= count; i+=1) {
            var team = "#team"+i;
            teamList.push($(team).val());
        }
    };
    
    var getTeamCount = function() {
        teamCount = $(this).val();
        var domCount = $(".teams").length;
        if (domCount < teamCount) {
            var delta =  teamCount - domCount;
            for (var i=1; i<=delta; i+=1) {
                var newTeamNum = domCount+i;
                var newTeam = '<input type="text" id="team'+newTeamNum+'" value="Team '+newTeamNum+'" class="teams"><br>';
                $("#tourneySubmit").before(newTeam);
            }
        }
        else if (domCount > teamCount) {
            var delta = domCount - teamCount;
            for (var i=1; i<=delta; i+=1) {
                $(".teams").last().remove();
                $("#createTourney br").last().remove();
            }
        }
    };
    
    var createTournament = function() {
        getTeams();
        var tournament = {
            'teams': teamList
        };
        var ajax = $.ajax('/tournament', {
            type: 'POST',
            data: JSON.stringify(tournament),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done(getTournaments);
    };
    
    var getTournaments = function() {
    var ajax = $.ajax('/tournament', {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(console.log(this.data));
    };
    
    $("#tourneySubmit").on('click', createTournament); //need to turn this into a post to create a tournament 
    
    $("#teamCount").on('keyup', getTeamCount);
    $("#teamCount").on('focusout',getTeamCount);

});