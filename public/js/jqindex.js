//搜索框
$(document).ready(function () {
    $(".indexSouSuo").focus(function () {
        $(document).keydown(function (event) {
            if (event.keyCode == 13) {
                var myhref = "https://www.baidu.com/s?ie=UTF-8&wd=" + $(".indexSouSuo").val();
                window.location.href = myhref;
            }
        });
        $(".indexSouSuo").animate({
            width: "90%"
        }, 500);
    });
    $(".indexSouSuo").blur(function () {
        $(".indexSouSuo").animate({
            width: "60%"
        }, 500);
    });
});

var i = 1;
setInterval(function () {
    switch (i) {
        case 1:
            $(".lunBoTu img:nth-child(3)").animate({
                width: "0%"
            }, 1500);
            setTimeout(function () {
                $(".lunBoTu img:nth-child(2)").animate({
                width: "100%"
            }, 1500);
            }, 1500);
            
            i++
            break;
        case 2:
            $(".lunBoTu img:nth-child(3)").animate({
                width: "100%"
            }, 1500);
            setTimeout(function () {
                $(".lunBoTu img:nth-child(2)").animate({
                width: "0%"
            }, 1500);
            }, 1500);
            i=1
            break;
    }
}, 4500);
function chongDingXiang(){
    setTimeout(function () {
window.location.href = "http://127.0.0.1:8888/";
    }, 1000);
}



