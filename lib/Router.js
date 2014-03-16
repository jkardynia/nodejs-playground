var Router = function(config){
    
    return {
        findController: function(request){
            var method = request.method;
            var url = request.url;
            
            for(var entryIndex in config){
                var route = config[entryIndex];

                if(route.url === url && route.method === method){
                    return route.controller;
                }
            }
            
            throw {msg: "Can not find route definition for: " + method + " " + url};
        }
    };
};

exports.createRouter = function(config){
    return new Router(config);
};