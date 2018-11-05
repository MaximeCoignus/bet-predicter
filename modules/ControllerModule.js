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

        /**
         * Initialized on start, without hash
         * @method
         */
         home :  function () {
            gameView = new GameView();

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
