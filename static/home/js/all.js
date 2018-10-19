//获取进来页面所携带的参数相关,自调用
function ymload() {
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == null) {
        console.log(11);
        $(".amid").html('<div><img src="/static/common/img/timg.gif" alt="" style="width:60%;"><p class="submit"><a href="/index.html">请返回登录登录。。。</a></p></div>');
    } else {
        $(".amid-right-content").load('/home/am.html');
        $(".atop").load('/head.html');
        $(".afoot").load('/foot.html');
    }

}
ymload();

//根据点击事件切换右边的页面
$(".amid-left-lis").on('click','p', function () {
    var pval = $(this).attr('val');
    if (pval == 0) {
        $(".amid-right-content").load('/home/tj.html');
    } else if (pval == 1) {
        $(".amid-right-content").load('/home/zl.html');
    } else if (pval == 2) {
        $(".amid-right-content").load('/home/am.html');
    } else if (pval == 3) {
        $(".amid-right-content").load('/home/pm.html');
    } else if (pval == 4) {
        $(".amid-right-content").load('/home/me.html');
    } else {
        $(".amid-right-content").load('/home/other.html');
    }
});