# 项目的目录结构
共分为三部分，未提及的文档是npm安装的包、node服务支持配置与web等配置：
1. 前端代码：myMDproject.html
2. 运行在服务器上的node.js代码：server.js
3. 存储在服务器上的数据：data.txt
4. 配置文件：assets.json

# 代码结构
1. HTML页面构成
    * 主体是由id为分别为left和right的div构成，两者并列排序
    * 最上方是快速操作按钮的工具栏
    * left是以`textarea`作为输入区域，right是渲染后的效果展示区域
2. HTML顶部工具
    * 有加粗、倾斜、标题等功能，通过`onclick()`传入参数，用`untils()`进行响应
3. CSS样式表
    * HTML页面的head中大部分为CSS样式表
    * 因为代码涉及的文件并不复杂，所以没将CSS文件独立出来
    * 对右侧渲染的元素做了样式
    * 对工具栏以及页面布局做了一定样式
4. HTML页面JS代码中的三个函数
    * `convert()`：作为解析md文档的核心，并将输入内容提交到后台存储，渲染后的html代码展示到右侧
        * 解析功能主要是引入marked.js文件进行解析
    * `untils()`：工具栏响应，通过用户的选择与单击，更新左侧输入内容，主要是对字符串的更新
        * 主要思路是获取用户选择文本的开始和结束位置来对`textarea`中的字符串进行插入操作
    * `sendData(myText, reset)`：与服务器交互的代码，更新代码到data.txt与读取data.txt到`textarea`中
        * 第一个参数是即将上传的文本内容，如果为空则表示想要读，这时候会返回data.txt中的数据
        * 第二个参数是是否需要更新`textarea`中的内容，可以防止与convert反复调用
        * 其中addressUri代表服务的地址，可以在assets.json配置文件中来动态更改服务地址
5. server.js服务程序
    * 本服务与HTML页面约定好一个规则，即参数data如果为空，则读取，反之则写入
    * 与addressUri相同，这个服务程序得变量fileAddress也可以在配置文件中更改，代表存储文件地址
    * get方法不够安全，只是为了测试简便，可以使用post来进一步升级
    * cors可以防止跨域请求被阻止的问题
6. assets.json配置文件
    * dataAddress代表data.txt在服务器上的储存路径
    * serverUri代表node服务的服务地址

# 项目配置须知
下载项目到本地后，需要适配本机做一些变更
1. 更改assets.json的dataAddress为当前环境下data.txt的绝对路径
2. 开启IIS服务（或其他部署环境均可），此地址称为网页地址
3. 在MDproject文件夹下使用node server.js命令，获得服务地址
4. 更改assets.json的serverUri为刚刚开启的服务地址
5. 直接访问网页地址或在服务器端使用IIS浏览myMDproject.html文件即可
