module.exports = (function(){
    var name = 'greeting';
    
    return {
        getName: function(){
            return name;
        },
        emit: function(data){
            return { msg: 'Hello' };
        },
        on: function(data, socket){
            socket.emit('greeting', {
                msg: 'Hello ' + data.msg
            });
        }
    };
})();

