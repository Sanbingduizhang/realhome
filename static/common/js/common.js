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
    // localStorage.removeItem('real-home-token');
    return $.cookie('real-home-token');
}