define(["marionette",
        "text!../templates/game.tpl"], function(Marionette, tplGame ) {
    var CollectionView = Marionette.ItemView.extend({
        template : _.template(tplGame)
    });

    return CollectionView;
});
