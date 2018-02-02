## 如何运行

我已经测试过此项目可以运行, 你可以通过以下步骤运行此项目:

1. 先使用 npm i 安装好项目依赖
2. 使用 npm start 命令开启项目
3. 在浏览器通过 : localhost:9003 访问此项目
4. npm run dev 项目打包上线

## 以下是和视频对比被改动的文件

关于 server.js
    我注释了原来的第7行代码 : `const bs = require('browser-sync').create();`, 这行代码在实例中并无用处

关于 package.json
    * 在 devDependencies 里删除了对 browser-sync 的依赖: "browser-sync": "^2.18.8",
    我们并不用到此依赖

## 关于打包和本地的运行   package.json 中的配置
运行-node server:   "scripts"：{"dev": "NODE_ENV=dev webpack"} 
打包-npm run dev    "scripts"：{"dev": "webpack"} 

## 关于使用react-route browerHistory,nginx的配置问题
.net后端 iis rewrite到 ／ 基本都这个原理无论nginx node 或者是apache


###前端设置 使用HashRouter   解决打包到正式环境 跳转页面404的问题

不能使用hashRouter的时候  没有使用create-react-app的使用

