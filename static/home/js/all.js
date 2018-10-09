

//获取进来页面所携带的参数相关,自调用
function ymload() {
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == null) {
        console.log(11);
        $(".amid").html('<div><img src="/static/common/img/timg.gif" alt="" style="width:60%;"><p class="submit"><a href="/index.html">请返回登录登录。。。</a></p></div>');
    } else {
        var urlA = GetQueryString("ym");
    if (urlA == 'am') {
        $(".amid-right-content").load('/home/am.html');
    } else if (urlA == 'pm') {
        $(".amid-right-content").load('/home/pm.html');
    } else {
        $(".amid-right-content").load('/home/zl.html');
    }
    $(".atop").load('/head.html');
    $(".afoot").load('/foot.html');
    }
    
}
ymload();
