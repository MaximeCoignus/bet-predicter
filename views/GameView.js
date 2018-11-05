define(["marionette",
        "text!../templates/game.tpl",
        "text!../templates/list_game.tpl"], function(Marionette, gameTpl, listGame ) {
    var CollectionView = Marionette.CollectionView.extend({
        template : _.template(listGame),
        childViewContainer: 'js-game-list'
    });
    var TeamView = Marionette.ItemView.extend({
        template : _.template(gameTpl)
    });

    return TeamView;

});
