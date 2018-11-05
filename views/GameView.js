define(["marionette",
        "text!../templates/game.tpl"], function(Marionette, gameTpl ) {
    var GameView = Marionette.ItemView.extend({
        template : _.template(gameTpl)
    });

    return GameView;

});
