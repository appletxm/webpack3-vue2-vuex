var http = require('http');
var serverProxy = {
    doProxy: function(opt, request, response){
        var options = {
            host: opt.host, // 这里是代理服务器       
            port: opt.port, // 这里是代理服务器端口 
            path: request.url,       
            method: request.method
            // headers: {
            //     // 如果代理服务器需要认证
            //     'Proxy-Authentication': 'Base ' + new Buffer('user:password').toString('base64')    // 替换为代理服务器用户名和密码
            // }       
        };

        console.info('[PROXY TO]:', JSON.stringify(options));

        var req = http.request(options, function(res) {
            console.log('[STATUS]: ' + res.statusCode);  
            console.log('[HEADERS]: ' + JSON.stringify(res.headers));  
            res.setEncoding('utf8');  
            res.pipe(response);  
            // res.on('data', function (chunk) {  
            //     console.log('[BODY]: ' + chunk);  
            //     res.pipe(response);  
            // });  
            res.on('end', function(){
                console.info('[PROXY complete]');
            });
        });

        req.on('error', function (e) {  
            console.log('problem with request: ' + e.message);  
        });  
        req.end(function(){
            console.info('[PROXY success]');
        }); 
    },

    doPost: function(res){
    }
};

module.exports = serverProxy;