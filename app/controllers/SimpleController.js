module.exports = function()
{
    return {
        execute: function(request, response){
            console.log("Executed SimpleController");
            response.writeHead(200, {"Content-Type": "text/plain"});
			response.end("Hello World");
			
        }
    };
}();
