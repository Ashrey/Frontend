var App = {};

App.render   = function(id, data){
    var rendered = Handlebars.compile($(id).html());   // optional, speeds up future uses
    $('#output').html(rendered(data));
}

routie('', function() {
    console.info('Default');
    $.getJSON('data.json', function(data){
        App.data = data;
        App.render('#default', {user: data});
    });
});