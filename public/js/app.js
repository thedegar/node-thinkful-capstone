//////////////////////////////////////////////
// Created by Tyler Hedegard
// on 1/27/2016
// Thinkful.com Node JS Capstone Project
//////////////////////////////////////////////

$(document).ready(function() {
    var socket = io();
    var teamCount = 8;
    var teamList = [];
    var name;
    var type;
    var date;
    var location;
    var start;
    var sport;
    var gameLength;
    var fields;
    var tournamentList;
    
    var getTeams = function() {
        var count = $(".teams").length;
        teamList = []; //reset team list
        for (var i=1; i <= count; i+=1) {
            var team = "#team"+i;
            teamList.push($(team).val());
        }
    };
    
    var getInfo = function() {
        getTeams();
        name = $('#name').val();
        type = $('#bracketType').val();  
        date = $('#date').val();
        location = $('#location').val();
        start = $('#startTime').val();
        sport = $('#sport').val();
        gameLength = $('#gameLength').val();
        fields = $('#fieldCount').val();
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
        getInfo();
        var tournament = {
            'name': name,
            'bracketType': type,
            'teams': teamList, 
            'date': date,
            'location': location, 
            'startTime': start, 
            'sport': sport, 
            'director': null, 
            'password': null, 
            'gameLength': gameLength, 
            'fieldCount': fields, 
            'fieldNames': [],
            'officials': [], 
            'games': []
        };
        //console.log(JSON.stringify(tournament));
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
        ajax.done(this.onGetTournamentsDone.bind(this));  //Can't figure out how to get the tournaments into front end
            //I think I need to use sockets.io, but the shopping list app was able to handle it without sockets...
    };
    
    //Tried to replicate what was done in shopping list app
    var onGetTournamentsDone = function(tournaments) {
        this.tournaments = tournaments;
        console.log(tournaments);
        this.updateTournamentsView();
    };
    
    var updateTournamentsView = function() {
        var context = {
            tournaments: this.tournaments
        };
        var tournamentList = $(this.tournamentListTemplate(context));
        this.tournamentList.replaceWith(tournamentList);
        this.tournamentList = tournamentList;
    };
    
    var deleteTournaments = function() {
        var ajax = $.ajax('/tournament', {
            type: 'DELETE',
            dataType: 'json'
        });
        ajax.done(getTournaments);
    };
    
    $("#tourneySubmit").on('click', createTournament); //need to turn this into a post to create a tournament 
    
    $("#teamCount").on('keyup', getTeamCount);
    $("#teamCount").on('focusout',getTeamCount);

    $("#delete").on('click', deleteTournaments);
});