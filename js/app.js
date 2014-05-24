var App = {};

App.render   = function(id, data){
    var rendered = Handlebars.compile($(id).html());   // optional, speeds up future uses
    $('#output').html(rendered(data));
}

$(function(){
    if(window.location.hash)
        routie('');
});

routie('', function() {
    $.getJSON('data.json', function(data){
        App.data = data;
        App.render('#default', {user: App.data});
    });
});

routie('mapa/:id', function(e) {
    var row = _.findWhere(App.data, {id: parseInt(e)});
    App.render('#location', row);
    map = new GMaps({
        div: '#maps',
        lat: row.latitude,
        lng: row.longitude,
        width: "100%",
        height: "30em",
        zoom : 5
    });
});

routie('amigos/:id', function(e) {
    var row = _.findWhere(App.data, {id: parseInt(e)});
    App.render('#friend', row);
});
