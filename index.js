var express = require('express'); //express框架模块
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var url = require('url');//路径模块
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
//创建应用
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
var hostName = '193.112.70.149'; //ip
var port = 8083; //端口

//设置允许跨域请求
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//创建应用，别问为什么创建两次，我也不知道为什么创建一次读取不到数据
var app = express();

// 创建静态服务
app.use(express.static('public'));

//创建路由
app.get('/', function (req, res) {
    res.redirect('./index.html');
    res.send();
});

//创建get接口
app.get('/api', function (req, res) {

    var file = path.join(__dirname, 'data/test.json'); //文件路径，__dirname为当前运行js文件的目录

    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            console.log("获取成功");

            res.send(data);
        }
    });
});
//带参商品详情
app.get('/:userid', function (req, res) {

    var file = path.join(__dirname, 'data/test.json'); //文件路径，__dirname为当前运行js文件的目录
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            for (let index = 0; index < person.data.length; index++) {
                if (person.data[index].spid == req.params.userid) {
                    res.send(`

                    <!DOCTYPE html>
                    <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
                        <script src="./js/jquery.cookie.js"></script>
                        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
                        <link rel="stylesheet" href="./css/spxq.css">
                        <title>Document</title>
                    </head>

                    <body>
                        <div id="root">
                            <myheader></myheader>
                            <section>
                                <div id="main" class="main">
                <h1>` + person.data[index].spname + `</h1>
                <p>商品价格：<span>` + person.data[index].shuliang + `</span></p>
                <p>` + person.data[index].name + `联系方式：` + person.data[index].phone + `</p>
                <p class="spxqNeiRong">` + person.data[index].spxq + `</p>
                
                <img src="` + person.data[index].imgsre + `" alt="">
                                </div>
                            </section>
                        <myfooter :dlzt="dlzt"></myfooter>
                    </div>
                    </body>
                    <script src="./js/vueMobil.js"></script>
                    <script src="./js/index.js"></script>
                    <script src="./js/jqindex.js"></script>

                    </html>`);//req.params.userid获取userid的值
                }
            }
             res.end("<h1  style='text-align: center'><a href='/'>Commodity Information Reading Failed, Click Back to Home Page</a><h1>");
        }
    });
});


// 增加商品接口
app.post('/tianjiasp', function (req, res) {
    //获取路径
    var url = req.url;
    //获取请求提交方式
    var method = req.method;
    if (url == "/tianjiasp" && method.toLowerCase() == "post") {
        //表单提交请求
        //数据拼接
        var dataList = "";
        //获取数据
        req.addListener("data", function (chunk) {
            dataList += chunk;
            dataList = decodeURIComponent(dataList);
            console.log("获取到的初始数据" + dataList);
            var spid = 0;
            console.log(spid);

            //现将json文件读出来用来生成商品id
            var file = path.join(__dirname, 'data/test.json');
            fs.readFile(file, function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("执行" + data);

                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                console.log("this.spid11" + this.spid);
                this.spid = person.data.length;//获取总条数用于做商品id
                console.log("this.spid12" + this.spid);
            })


            function writeJson(dataList) {
                //处理post过来的数据
                var str1 = dataList.split("&");
                var str = [];
                for (let index = 0; index < str1.length; index++) {
                    var str2 = str1[index].split("=");
                    str[index] = str2[1];
                }
                //储存变量用于赋值，局部使用
                var a = str[0];//用户名
                var b = str[1];//联系电话
                var c = str[2];//商品名字
                var d = str[3];//商品详情
                var e = str[4];//商品详情

                console.log("this.spid22" + this.spid);
                var params = {
                    "name": a,
                    "phone": b,
                    "imgsre": "./img/img.jpg",
                    "spname": c,
                    "spxq": d,
                    "spid": this.spid,
                    "shuliang": e
                }
                //现将json文件读出来
                var file = path.join(__dirname, 'data/test.json');
                fs.readFile(file, function (err, data) {
                    if (err) {
                        return console.error(err);
                    }

                    var person = data.toString();//将二进制的数据转换为字符串
                    person = JSON.parse(person);//将字符串转换为json对象
                    person.data.unshift(params);//将传来的对象push进数组对象中
                    person.total = person.data.length;//定义一下总条数
                    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                    fs.writeFile(file, str, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        console.log('----------新增成功-------------');
                    })
                })
            }
            writeJson(dataList)//执行一下;
            res.redirect('./index.html');
            res.end();
        });
    }
});


app.listen(port, hostName, function () {

    console.log(`服务器运行在http://${hostName}:${port}`);

});