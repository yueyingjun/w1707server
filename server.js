#!/usr/bin/env node
var http=require("http");
var config=require("./config.json");
var path=require("path");
var fs=require("fs");
const zlib = require('zlib');

http.createServer(function(req,res){

    var url=req.url;
    if(req.headers.cookie!=="name=zhangsan"&&req.headers.cookie!==undefined){
        res.end("login");
    }else {
        if (url == "/favicon.ico") {
            fs.readFile("." + url, function (err, data) {
                if(err){
                    res.end();
                }else {
                    res.setHeader("content-type", "application/x-ico");
                    res.end(data);
                }
            })

        } else {

            var root = path.resolve(config.root);
            fs.readdir(root, function (err, data) {
                if (err) {
                    res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                    res.end("根目录不存在");
                } else {
                    if (path.extname(url)) {
                        var fullUrl = path.resolve(config.root, "." + url);

                    } else {
                        var fullUrl = path.resolve(config.root, "." + url + "/" + config.index);
                    }

                    fs.stat(fullUrl, function (err, info) {

                        if (err){
                            res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                            res.end("页面不存在");
                        } else {

                            if(config["server-info"]){
                                res.setHeader("server",config["server-info"]);
                            }
                            if(config["cache-control"]){
                                res.setHeader("cache-control",config["cache-control"])
                            }
                            var time1 = ( new Date(req.headers["if-modified-since"]).getTime());
                            var time2 = new Date(info.mtime).getTime();

                            if (time1 && time1 == time2 &&config["last-modified"]) {
                                res.writeHead(304);
                                res.end();
                            } else {
                                if(config["last-modified"]) {
                                    res.setHeader("Last-Modified", info.mtime.toUTCString());
                                }


                                var extname = path.extname(fullUrl);
                                res.setHeader("set-cookie", "name=zhangsan");
                                res.setHeader("Content-Encoding", "gzip");

                                res.writeHead(200, {"content-type": config.type[extname] + ";charset=utf-8"});

                                fs.createReadStream(fullUrl).pipe(zlib.createGzip()).pipe(res)


                            }
                        }
                    })


                }
            })

        }
    }

}).listen(config.port,function(){
    console.log(config.message);
});





