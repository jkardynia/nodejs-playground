module.exports = (function(){
    var logger = require(__dirname + '/../../lib/LoggerFactory').createDefault();
    var mainSocket;
    
    var register = function(eventName, socket){
        var event = require('./Events/' + eventName);
        
        socket.on(event.getName(), function(data){
            logger.info('Event Recived: ' + event.getName());
            return event.on(data, socket);
        });
    };
    
    return {
        init: function(socketsIo){
            socketsIo.sockets.on('connection', function (socket) {
                mainSocket = socket;
                register('GreetingEvent', socket);
            });
        },
        emit: function(event){
            mainSocket.emit(event.getName(), event.emit());
        }
    };
})();


