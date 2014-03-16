var App = (function(config, router){
    var name = "MyTestApp";
    var logger = require('../lib/LoggerFactory').createDefault();
    var fs = require('fs');
    
    var executeController = function(controllerName, request, response){
        var controller = require(config.controllersPath + '/' + controllerName);
        
        response.writeHead(200);
        var viewName = controller.execute(request, response) || controllerName;
        renderView(config.viewsPath + '/' + viewName + '.html', response);
    };
    
    var renderView = function(viewPath, response){
        fs.readFile(viewPath,
            function (err, data) {
                if (err) {
                    logger.warn(err);
                    return;
                }

                response.end(data);
            });
    };
    
    return {
        getName: function(){
            return name;
        },
        init: function(socketsIo){
            if(socketsIo){
                var eventManager = require(config.socketEventsPath + '/EventManager');

                eventManager.init(socketsIo);
            }
            
            logger.info("Initializing " + name);
        },
        dispatch: function(request, response){
            logger.info("[Request] " + request.method + " " +request.url);
            
            var controllerName = router.findController(request);
            
            executeController(controllerName, request, response);

            logger.info("[Response - StatusCode] " + response.statusCode);
        }            
    };
});

exports.createApp = function() { 
    var routes = require('./config/routes.json');
    var config = require('./config/config.json');
    var routerFactory = require('../lib/Router');
    
    return new App(config, routerFactory.createRouter(routes));
};


