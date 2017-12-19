var http=require("http");
var config=require("./config.json");
var path=require("path");
var fs=require("fs");
http.createServer(function(req,res){
    var url=req.url;
    if(url=="/favicon.ico") {
        res.end();
    }else{
        var root=path.resolve(config.root);
        fs.readdir(root,function(err,data){
            if(err){
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                res.end("根目录不存在");
            }else{

                if(path.extname(url)){
                    var fullUrl=path.join(__dirname,config.root,"."+url);
                }else{
                    var fullUrl=path.join(__dirname,config.root,"."+url+"/"+config.index);
                }

                fs.readFile(fullUrl,function(err,data){
                    if(err){
                        res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                        res.end("页面不存在");
                    }else{
                        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
                      res.end(data);
                    }
                })


            }
        })

    }

}).listen(8888);





