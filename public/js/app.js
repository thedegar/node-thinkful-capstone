//////////////////////////////////////////////
// Created by Tyler Hedegard
// on 1/27/2016
// Thinkful.com Node JS Capstone Project
//////////////////////////////////////////////

$(document).ready(function() {
    var teamCount = 8;
    
    var getTeams = function() {
        var count = $(".teams").length;
        var teamList = [];
        for (var i=1; i <= count; i+=1) {
            var team = "#team"+i;
            teamList.push($(team).val());
        }
    };
    
    var getTeamCount = function() {
        teamCount = $(this).val();
        var domCount = $(".teams").length;
        //console.log(teamCount);
        if (domCount < teamCount) {
            var delta =  teamCount - domCount;
            console.log(delta);
            for (var i=1; i<=delta; i+=1) {
                var newTeamNum = domCount+i;
                var newTeam = '<input type="text" id="team'+newTeamNum+'" value="Team '+newTeamNum+'" class="teams"><br>';
                $("#tourneySubmit").before(newTeam);
                console.log(newTeam);
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
    
    $("#tourneySubmit").on('click', getTeams);
    
    $("#teamCount").on('keyup', getTeamCount);
    $("#teamCount").on('focusout',getTeamCount);
});