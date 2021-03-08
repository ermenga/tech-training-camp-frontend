var app = require('express')();
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var cors = require('cors');

app.use(cors());
app.listen(3000, () => {
    console.log('服务启动');
})

let assets = require("./assets.json");
var fileAddress = assets.dataAddress;
if (!fileAddress) {
    console.log("配置储存文件失败-请手动配置fileAddress")
}

app.get('/', (req, res) => {
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
    console.log(params.data);
    if (params.data) {
        fs.writeFile(fileAddress, params.data, function (error) {
            if (error) {
                res.send('failed');
                console.log('写入失败');
            } else {
                res.send('succeed');
                console.log('写入成功');
            }
        })
    } else {
        fs.readFile(fileAddress, 'utf-8', function (error, data) {
            if (error) {
                console.log('读取文件失败')
            } else {
                res.send(data.toString());
            }
        })
    }
})
