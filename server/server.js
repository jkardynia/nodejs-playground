var http = require("http");

var HttpServer = (function(config){
    var logger = require('../lib/LoggerFactory').createDefault();
    var deployedApps = [];
    var modules = [];
    var socketsIo;
    
    var createServer = function(){
        return http.createServer(function(request, response) {
                
                try{
                    deployedApps['MyTestApp'].dispatch(request, response);
                }catch(e){
                    response.writeHead(500);
                    logger.error(e);
                    response.end();
                }
                
		});
    };
    
    var initModules = function(server){
        for(var moduleNameIndex in config.modules){
            var moduleName = config.modules[moduleNameIndex];
            modules[moduleName] = require(moduleName);
            configureModule(moduleName, server);
        }
    };
    
    var configureModule = function(moduleName, server){
        if(moduleName === 'socket.io'){
           socketsIo = modules[moduleName].listen(server);
        }
    };
    
	return {
		start: function(){
			logger.info("Starting http server on port " + config.port);
			
			var server = createServer();
            
            initModules(server);
            server.listen(config.port);
            
			logger.info("Http server is running. Waiting for requests.");
		},
        deploy: function(application){
            try{
                logger.info("Depploying: " + application.getName());
                
                application.init(socketsIo);
                
                deployedApps[application.getName()] = application;

                logger.info("Depployed: " + application.getName());
            }catch(e){
                logger.error(e);
            }
        }
	};
});

var config = require('./config.json');

var server = new HttpServer(config);

exports.start = server.start;
exports.deploy = server.deploy;