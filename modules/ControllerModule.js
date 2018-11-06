define(["marionette",
        "../views/HiView",
        "../views/GameView"],
        function (Marionette, HiView, GameView) {

    var Controller = Marionette.Controller.extend({
        initialize : function(options) {
          // store a region that will be used to show the stuff rendered by this component
          this.mainRegion = options.mainRegion;
        },
        start: function() {
            //TODO: code to start
        },

        fetchDataFromFeeds: () => {
            const token = "653e4d48-3368-4785-b14c-a4d4d9";
            const passwd = "kWv29ECXeyx4KP8";
            let urlTeams = "https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-2019-regular/team_gamelogs.json?team=";
            let urlGames = "https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-2019-regular/full_game_schedule.json?team=";
        
            let games = [];

            for (let i=1; i <= 30; i++) {
                $.ajax
                ({
                type: "GET",
                url: `${urlTeams}${i}`,
                dataType: 'json',
                async: false,
                headers: {
                    "Authorization": "Basic " + btoa(`${token}:${passwd}`)
                },
                success: function (res){
                    var canBet = true;
                    for(var j = 1; j <= 4; j++) {
                        Number(res.teamgamelogs.gamelogs[res.teamgamelogs.gamelogs.length-j].stats.GoalsFor["#text"]) + 
                        Number(res.teamgamelogs.gamelogs[res.teamgamelogs.gamelogs.length-j].stats.GoalsAgainst["#text"]) > 5 
                        ? console.log("") : canBet = false;
                    }
                    var nextGame = res.teamgamelogs.gamelogs.length;
                    canBet ?
                        $.ajax
                        ({
                        type: "GET",
                        url: `${urlGames}${i}`,
                        dataType: 'json',
                        async: false,
                        headers: {
                            "Authorization": "Basic " + btoa(`${token}:${passwd}`)
                        },
                        success: function (res){
                            games.push({name : `${res.fullgameschedule.gameentry[nextGame].homeTeam.Name} v ${res.fullgameschedule.gameentry[nextGame].awayTeam.Name}`});
                        }
                        }) : 
                        console.log("no bet");
                    }
                })
               
            }
        
            $.ajax
            ({
              type: "GET",
              url: `${urlTeams}142`,
              dataType: 'json',
              async: false,
              headers: {
                "Authorization": "Basic " + btoa(`${token}:${passwd}`)
              },
              success: function (res){
                var canBet = true;
                for(var i = 1; i <= 4; i++) {
                    Number(res.teamgamelogs.gamelogs[res.teamgamelogs.gamelogs.length-i].stats.GoalsFor["#text"]) + 
                    Number(res.teamgamelogs.gamelogs[res.teamgamelogs.gamelogs.length-i].stats.GoalsAgainst["#text"]) > 5 
                    ? console.log("") : canBet = false;
                }
                var nextGame = res.teamgamelogs.gamelogs.length;
                canBet ?
                    $.ajax
                    ({
                      type: "GET",
                      url: `${urlGames}142`,
                      dataType: 'json',
                      async: false,
                      headers: {
                        "Authorization": "Basic " + btoa(`${token}:${passwd}`)
                      },
                      success: function (res){
                        games.push({name : `${res.fullgameschedule.gameentry[nextGame].homeTeam.Name} v ${res.fullgameschedule.gameentry[nextGame].awayTeam.Name}`});
                      }
                    }) : 
                    console.log("no bet");
              }
            })
            return games;
        },

        /**
         * Initialized on start, without hash
         * @method
         */
         home :  function () {
            let listOfGames = this.fetchDataFromFeeds();

            const Team = Backbone.Model.extend({
                defaults: {
                    name: "No bet"
                }
            });

            const TeamsCollection = Backbone.Collection.extend({
                model: Team
            });
            const myCollection = new TeamsCollection();

            myCollection.set(listOfGames);

            gameView = new GameView({
                collection: myCollection
            });

            // Add View to region to be render
            this.mainRegion.show(gameView);
        },
        helloBuddy : function (buddy) {
          hiView = new HiView({
            buddy: buddy
          });

          // Render view in main Region, removing previous view
          this.mainRegion.show(hiView);
        }
    });

    return Controller;
});
