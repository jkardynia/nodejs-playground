var log4js = require('log4js');


exports.createDefault = function(){
    log4js.configure({
        appenders: [
          { type: 'console' }
        ]
    });

    return log4js.getLogger();
};