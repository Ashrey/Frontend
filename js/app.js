var App = {};

App.render   = function(id, data){
    var rendered = Handlebars.compile($(id).html()), 
        anima = ['rotateIn', 'bounceInLeft', 'fadeInDownBig', 'rollIn', 'slideInDown',
            'lightSpeedIn'],
        item = anima[Math.floor(Math.random()*anima.length)];;   
    $('#output').html(rendered(data));
    $('#output').addClass('animated '+item)
    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });

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
    if(!row)return;
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
