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

function getDate() {
    //获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}
//比较时间算出年龄
function compareDate(oldArr) {
    var newArr = getDate().split("-");
    var chuanArr = oldArr.split("-");
    var newy = newArr[0] - chuanArr[0];
    var newm = newArr[1] - chuanArr[1];
    var newd = newArr[2] - chuanArr[2];
    if (newm < 0 || (newm == 0 && newd < 0)) {
        newy = newy - 1;
    }
    return newy;
}