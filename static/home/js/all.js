//获取进来页面所携带的参数相关,自调用
function ymload() {
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == null) {
        console.log(11);
        $(".amid").html('<div><img src="/static/common/img/timg.gif" alt="" style="width:60%;"><p class="submit"><a href="/index.html">请返回登录登录。。。</a></p></div>');
    } else {
        $(".amid-right-content").load('/home/tj.html');
        $(".atop").load('/head.html');
        $(".afoot").load('/foot.html');
    }
}
ymload();

//左边头像以及下方信息显示
function getUserMsgAll() {
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == null) {
        alert("请重新登录");
        return false;
    }
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/opera/getuser",
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        success: function (response) {
            if (response.code == 1) {
                var age = compareDate(response.data.birthday);
                var usercode = response.data.usercode;
                var name = response.data.name;
                if (name.length > 6) {
                    name = name.substring(0, 5) + '...';
                }
                if (usercode.length > 10) {
                    usercode = usercode.substring(0, 10) + '...';
                }
                var str = '<p>账&nbsp;&nbsp;&nbsp;&nbsp;号:<span class="alzh" title="' + response.data.usercode + '">' + usercode + '</span></p><p>用户名:<span class="almz" title="' + response.data.name + '">' + name + '</span></p><p>性&nbsp;&nbsp;&nbsp;&nbsp;别:<span class="alsex" title="' + response.data.sex + '">' + response.data.sex + '</span></p><p>年&nbsp;&nbsp;&nbsp;&nbsp;龄:<span class="alage" title="' + response.data.birthday + '">' + age + '</span></p>';
                $(".left-top-mess").html(str);
                var imgpath = response.data.img_path;
                if (imgpath == undefined || imgpath == '' || imgpath == null) {
                    imgpath = "/static/common/img/userhead.jpg";
                }
                $(".left-top-img").html('<img src="' + imgpath + '" alt="" title="头像  "class="img-tou">');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
getUserMsgAll();

//根据点击事件切换右边的页面
$(".amid-left-lis").on('click', 'p', function () {
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

//点击返回首页
$(".outshou").click(function () {
    window.location.href = "/";
});

//发表文章
$(".addar-goComment").click(function () {
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == null) {
        $(".amid").html('<div><img src="/static/common/img/timg.gif" alt="" style="width:60%;"><p class="submit"><a href="/index.html">请返回登录登录。。。</a></p></div>');
    } else {
        //获取数据
        var changecate = $(".addar-mt-changesel").find("option:selected").val();
        var pubs = $(".addar-mt-changepubsel").find("input[type='radio']:checked").val();
        var text = $("#addar-text-comments").val();
        var wordscount = text.length;
        if (wordscount < 10) {
            alert("您最少输入是个字符");
            return false;
        }
        $.ajax({
            type: "POST",
            url: getBaseUri() + "api/admin/ar/pubar",
            headers: {
                Authorization: 'Bearer ' + realToken,
            },
            data: {
                cate: changecate,
                pub: pubs,
                text: text,
                wordscount: wordscount
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                console.log(response.code)
                if (response.code == 1) {
                    $("#text-comments").val('');
                    $("#bgaddar").hide();
                    $(".amid-right-content").load('/home/am.html');
                    alert(response.data.message);

                } else {
                    alert(response.message);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    console.log(pubs)
});