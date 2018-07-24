# react-code-study

npm install 

npm start

然后打开浏览器打开/1.1.jsx/playground.html查看。默认端口是8080，例如[http://127.0.0.1:8080/1.1.jsx/playground.html](http://127.0.0.1:8080/1.1.jsx/playground.html)

目录结构：


	src -

		- app.js 一个组件

		- common.js 公用方法

		- component.js 组件父类

		- ComponentCollection.js 存放所有组件的容器（父组件如果包含了子组件需要创建子组件的实例，其实应该放在父组件上）

		- dom.js dom操作的方法

		- gendom.js 根据ast渲染组件

		- jsxparse.js jsx字符串解析为ast

		- playground.js 入口文件

问题：

1、jsx解析的时候直接获取了绑定的数据，导致jsx解析和组件实例耦合。Vue中是每个组件整体先拼接成一个字符串，然后渲染的时候获取值。

2、现在组件存放类似于了全局组件

3、初期没有想好jsx怎么处理，平常的项目中写，应该会在打包阶段把jsx已经转换成了React.createElement？（对react不是很熟，自己猜测）