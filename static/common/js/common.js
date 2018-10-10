//加在首页和尾页
$("#top").load("head.html");
$("#buttom").load("foot.html");
//背景层登陆点击操作
$(".button-close").click(function () {
    $("#bgsub").hide();
});

function getBaseUri() {
    return "http://realadmin.com/";
}

///////------------方法---------------//1

//获取拿到的token数据然后写入localStorage
function getRealToken() {
    return $.cookie('real-home-token');
}

//获取url地址?后某一个参数的方法
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}