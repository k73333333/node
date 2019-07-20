
new Vue({
    el: "#root",
    data: {
        selectById: [
            {
                name: "测试用户名",
                phone: "333",
                imgsre: "./img/img.jpg",
                spname: "商品名字",
                spid: 9,
                spsrc: "/9",
                spxq: "商品详情",
                shuliang: 1,
            },
        ],
        dlzt: '',//t为已登录为未登录
        yonghumin: '',//登录后保存用户电话号码
        dianhua: '',//登录后保存用户电话号码
        dlname: '',//登录时保存用户名用于验证
        dlpassword: '',//登录时保存用户用于验证
    },
    methods: {
        dengluck: function () {
            var self = this;
            $.ajax({
                async: false,
                url: 'http://127.0.0.1:8888/api',
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    for (let index = 0; index < data.username.length; index++) {
                        if (self.dlname == data.username[index].name && self.dlpassword == data.username[index].password) {
                            console.log("登录成功 ");
                            function decode(str) {
                                var _str = str.join(',');
                                return _str;
                            }
                            // 第一个用户名第二个电话 第三个是登录状态
                            var arr = [data.username[index].name, data.username[index].phone, 't', 'ddd'];
                            $.cookie('the_cookie', decode(arr), { expires: 7 });//存入
                        }
                    }
                },
            })
        },
        updateById: function () {
            $.ajax({
                type: "get",
                url: "127.0.0.1/api",
                data: vue.selectById,
                success: function (data) {
                    alert(data);
                },
                error: function () {
                    alert("错误");
                }
            });
        },
        tianjiaButton: function () {
            if (this.fabu == false) {
                this.fabu = true;
            } else {
                this.fabu = false;
            }
        },
    },
    components: {
        'lunbotu': {
            data: function () {
                return {
                    lunBoTuArr: [
                        { lunBoTua: "./index.html", lunBoTuSrc: "./img/lunbo1.png" },
                        { lunBoTua: "./index.html", lunBoTuSrc: "./img/lunbo2.png" },
                        { lunBoTua: "./index.html", lunBoTuSrc: "./img/lunbo3.png" }]
                }
            },
            template: `
            <div>
            <div class="lunBoTu">
            <img v-for="(v, i) in lunBoTuArr" :src="v.lunBoTuSrc" >
            </div>
            </div>
                    `
        },
    },
    beforeMount: function () {
        // cookie用户登录信息
        function encode(str) {
            var _arr = str.split(',');
            return _arr;
        }
        var newArr = encode($.cookie('the_cookie'));//读取
        this.yonghumin = newArr[0];
        this.dianhua = newArr[1];
        this.dlzt = newArr[2];
        var self = this;
        console.log("当前登录状态为：" + this.dlzt);
        console.log("当前登录账号为：" + this.yonghumin);
        console.log("当前登录账号联系方式为：" + this.dianhua);

        $.ajax({
            async: false,
            url: 'http://127.0.0.1:8888/api',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                for (let index = 0; index < data.data.length; index++) {
                    self.selectById.push({
                        name: data.data[index].name,
                        phone: data.data[index].phone,
                        imgsre: data.data[index].imgsre,
                        spname: data.data[index].spname,
                        spxq: data.data[index].spxq,
                        spid: data.data[index].spid,
                        spsrc: "/"+data.data[index].spid,
                        shuliang: data.data[index].shuliang
                    })
                }
            },
        })
    },
})      