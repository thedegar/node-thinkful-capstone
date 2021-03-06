//////////////////////////////////////////////
// Created by Tyler Hedegard
// on 1/27/2016
// Thinkful.com Node JS Capstone Project
//////////////////////////////////////////////

$(document).ready(function() {
    var socket = io();
    var liveTournament;
    
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
    var tournamentList = [];
    
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
        //start = $('#startTime').val();  //having a value here breaks the POST...suspect timestamp format issue
        sport = $('#sport').val();
        gameLength = $('#gameLength').val();
        fields = $('#fieldCount').val();
    };
    
    var getTeamCount = function() {
        teamCount = $("#teamCount").val();
        var domCount = $(".teams").length;
        if (domCount < teamCount) {
            var delta =  teamCount - domCount;
            for (var i=1; i<=delta; i+=1) {
                var newTeamNum = domCount+i;
                var newTeam = '<input type="text" id="team'+newTeamNum+'" value="Team '+newTeamNum+'" class="teams"><br>';
                $("#tourneyUpdate").before(newTeam);
            }
        }
        else if (domCount > teamCount) {
            var delta = domCount - teamCount;
            for (var i=1; i<=delta; i+=1) {
                if ($(".teams").length > 4) {
                    //never go less than 4 teams
                    $(".teams").last().remove().next("br").remove(); //Can't remove a few breaks
                    $("#createTourney>br:nth-last-of-type(3)").remove();
                }
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
        var ajax = $.ajax('/tournament', {
            type: 'POST',
            data: JSON.stringify(tournament),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done(getTournaments);
    };
    
    var getTournaments = function(tournament) {
        liveTournament = tournament;
        var ajax = $.ajax('/tournament', {
            type: 'GET',
            dataType: 'json'
        });
        ajax.done(onGetTournamentsDone);
        //ajax.done(onGetTournamentsDone);  //Can't figure out how to get the tournaments into front end
            //I think I need to use sockets.io, but the shopping list app was able to handle it without sockets...
    };
    
    //Tried to replicate what was done in shopping list app
    var onGetTournamentsDone = function(tournaments) {
        //manipulate DOM here
        tournamentList = [];
        $("#tournamentList").show();
        $("#tournamentList>ul").empty();
        for (var i in tournaments) {
            tournamentList.push(tournaments[i]._id);
            $("#tournamentList>ul").append("<li class='tournamentID'>"+tournaments[i]._id+"</li>");
        }
        $(".tournamentID").on('click', getOneTournament);
        $(".tournamentID").on('dblclick', deleteOneTournament);
    };
    
    var deleteTournaments = function() {
        var ajax = $.ajax('/tournament', {
            type: 'DELETE',
            dataType: 'json'
        });
        ajax.done(getTournaments);
    };
    
    //Get a single tournament's information
    var getOneTournament = function() {
        var id = $(this).text();
        var ajax = $.ajax('/tournament/'+id, {
            type: 'GET',
            dataType: 'json'
        });
        ajax.done(onGetOneTournamentDone); //do something with the returned tournament
    };
    
    var onGetOneTournamentDone = function(tournament) {  //56affece4f9cf7a46c3703df has team names
        liveTournament = tournament;
        $('#name').val(liveTournament.name);
        $('#bracketType').val(liveTournament.bracketType);  
        $('#date').val(liveTournament.date); 
        //***************Problem*********************
        //This date is not the same format as the front end form is expecting.
        //Need to fix this.
        //***************Resolution******************
        //
        $('#location').val(liveTournament.location);
        //start = $('#startTime').val();
        $('#sport').val(liveTournament.sport);
        $('#gameLength').val(liveTournament.gameLength);
        $('#fieldCount').val(liveTournament.fieldCount);
        $('#teamCount').val(liveTournament.teams.length);
        getTeamCount();
        for (var i=0;i<liveTournament.teams.length;i++) {
            $('#team'+(i+1)).val(liveTournament.teams[i]);
        }
        $('#tourneyUpdate').show();
    };
    
    var deleteOneTournament = function() {
        var id = $(this).text();
        var ajax = $.ajax('/tournament/'+id, {
            type: 'DELETE',
            dataType: 'json'
        });
        ajax.done(deleteOneTournamentDone);
    };
    
    var deleteOneTournamentDone = function(tournament) {
        $("li:contains("+tournament._id+")").remove();
    };
    
    var updateOneTournament = function() {
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
        var ajax = $.ajax('/tournament/'+liveTournament._id, {
            type: 'PUT',
            data: JSON.stringify(tournament),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done(console.log(tournament));
    };
    
    var checkUserID = function() {
        var userID = $("#userID").val();
        var ajax = $.ajax('/user/'+userID, {
            type: 'GET',
            datatype: 'json'
        });
        ajax.done(console.log('hit'));
    };
    
    $("#tourneySubmit").on('click', createTournament); //post route and get route triggered
    $("#delete").on('click', deleteTournaments);  //delete and get route route triggered
    $(".tournamentID").on('click', getOneTournament); //get route triggered
        //**********Problem****************
        //Here this can't be true for all new instances of .tournamentID.  
        //**********Resolution*************
        //Had to copy this line of code into the onGetTournamentsDone function to instanciate the listener
        //I think making the prototype would fix this as well.
    $(".tournamentID").on('dblclick', deleteOneTournament);  //delete one route triggered
        //**********Problem****************
        //Here this can't be true for all new instances of .tournamentID.  
        //**********Resolution*************
        //Had to copy this line of code into the onGetTournamentsDone function to instanciate the listener
        //I think making the prototype would fix this as well.
    $("#tourneyUpdate").on('click', updateOneTournament);  //update one route triggered

    $("#teamCount").on('keyup', getTeamCount);  //for frontend
    $("#teamCount").on('focusout',getTeamCount);  //for frontend
    //getTournaments();  //show tournaments for dev
    $("#delete").hide(); //hide delete all button
    
    //Login Triggers
    $("#loginButton").on('click', checkUserID);  //login/register trigger
    
    
    //Testing jquery-bracket library
    var minimalData = {
        teams : [
            ["Team 1", "Team 2"], /* first matchup */
            ["Team 3", "Team 4"]  /* second matchup */
        ],
        results : [
            [[1,2], [3,4]],       /* first round */
            [[4,6], [2,1]]        /* second round */
        ]
    };
    //console.log(minimalData);
 
    var bracket = $(function() {
        $('#minimal .demo').bracket({
            init: minimalData /* data to initialize the bracket with */ });
    });
    //console.log(bracket);
});