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

App.getById = function(id){
   return _.findWhere(App.data, {id: parseInt(id)});
}

$(function(){
    if(window.location.hash) routie('');
});

routie('', function() {
    /*Carga la data*/
    $.getJSON('data.json', function(data){
        App.data = data;
        App.render('#default', {user: App.data});
    });
});

routie('mapa/:id', function(e) {
    var row = App.getById(e);
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
    var row = App.getById(e);
    App.render('#friend', row);
});

routie('info/:id', function(e) {
    var row = App.getById(e);
    App.render('#info', row);
});

