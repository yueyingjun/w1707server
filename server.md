# 创建系统级别的命令

1.  在当前目录下 创建 package.json
2.  在package.json文件里面添加配置项  "bin":{命令:"执行文件"}
3. 在要执行的文件头部，指定解析的模块
   ```
     #!/usr/bin/env node
   ```
4. 把当前的这个功能打包上传
   ```
       npm  login  
       npm publish

    ```
5. 将对应的包全局安装
     
    ```
      npm  install  包名  -g  
    ```
    
6. 可以全局使用 ，能全局使用的命令就是你在bin

7. 可以忽略4,5步，不用打包上传，直接全局使用
```
    npm link
```