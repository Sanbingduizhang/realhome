$(".con-left-cons").on('click', '.arlikes', function () {
    var arid = $(this).attr('arid');

    console.log(arid);
    return false;
});

$(".con-right-nr").on('click', '.imglike', function () {
    console.log(333);
    $(this).children().attr('src', '/static/home/img/likego.png');
    var arid = $(this).parent().attr('arid');

    console.log(arid);
    return false;
});
//发表评论
$(".goComment").click(function () {
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == 'null') {
        alert('请先登录');
        return false;
    }
    //获取数据
    var content = $("#text-comments").val();
    var arid = $(this).attr('arid');
    if (content.length < 5) {
        alert('请输入最少五个字符的内容');
        return false;
    }
    if (arid.length <= 0) {
        alert('请稍后');
        return false;
    }
    //开始发送请求
    $.ajax({
        type: "POST",
        url: getBaseUri() + "api/opera/arcomadd",
        data: {
            arid: arid,
            content: content
        },
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        dataType: "json",
        success: function (response) {
            if (response.code != 1) {
                alert(response.message);
                return false;
            }
            indexComajax(realToken, arid);
            $("#text-comments").val('');
            alert(response.data.message);
            //
        },
        error: function (error) {
            console.log(error);
        }
    });

});

//点击首页右边显示细节内容
$(".con-right-con").on('click', 'p', function () {
    // console.log($(this).attr('arid'));
    var thisall = $(this);
    clickdetail(thisall);
});

//点击单个显示详情内容的
//关闭细节展示
$(".button-close-det").click(function () {
    $(".det-head").html('<img src="/static/common/img/timg.gif" alt="" style="width: 30px;">');
    $(".det-mid-text").html('<img src="/static/common/img/timg.gif" alt="" style="width: 300px;">');
    $(".det-mid-right").html('<img src="/static/common/img/timg.gif" alt="" style="width: 260px;">');
    $(".goComment").attr('arid', '');
    $("#bgdet").hide();
});
//文章细节展示
$(".con-left-cons").on('click', '.con-left-con', function () {
    var thisall = $(this);
    clickdetail(thisall);
});

//文章细节展示所有内容的方法
function clickdetail(thisall) {
    //获取arid
    var articleid = thisall.attr('arid');
    //判断用户是否登录
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == 'null') {
        realToken = '';
    }

    //文章以及头部显示
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/home/oneart/" + articleid,
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        success: function (response) {
            if (response.code != 1) {
                return false;
            }

            var datas = response.data;
            //填充头部信息
            var toustr = '<span>分类:' + datas.arcatename + '</span>' +
                '<span>&nbsp;&nbsp;</span>' +
                '<span>点赞(' + datas.like + ')</span>' +
                '<span>&nbsp;&nbsp;</span>' +
                '<span>评论(' + datas.pv + ')</span>' +
                '<span>&nbsp;&nbsp;</span>' +
                '<span>作者:' + datas.arusername + '</span>' +
                '<span>&nbsp;&nbsp;</span>' +
                '<span>更新时间:' + datas.updated_at + '</span>';

            $(".det-head").html(toustr);
            //填充内容
            var contentstr = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + datas.content;
            $(".det-mid-text").html(contentstr);
            $(".goComment").attr('arid', datas.id);
        },
        error: function (error) {
            console.log(error);
        }
    });

    //评论
    indexComajax(realToken, articleid);
    //显示渲染好的页面
    $("#bgdet").show();
}

//对评论点赞
$(".det-mid-right").on('click', '.comsan-like', function () {
    //获取此条评论的id
    var arlid = $(this).attr("arlid");
    var artid = $(this).attr("artid");
    var thisk = $(this);
    // console.log($(this).text());
    // return false;
    // console.log(arlid);
    // console.log(artid);
    // return false;
    //获取此条评论所对应的文章id
    //判断用户是否登录
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == 'null') {
        alert('请登录');
        return false;
    }
    //发送请求
    $.ajax({
        type: "POST",
        url: getBaseUri() + "api/opera/likego",
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        data: {
            arid: arlid,
            type: 2
        },
        success: function (response) {
            if (response.code != 1) {
                alert('操作失败');
                return false;
            }
            var str = thisk.text().split("(");
            var str1 = str[1].split(")");

            if (str[0] == '点赞') {
                var str11 = Number(str1[0]) + 1;
                var insertstr = '已赞(' + str11 + ')';
                thisk.text(insertstr);
                thisk.css('color', 'red');
            } else {
                var str11 = Number(str1[0]) - 1;
                var insertstr = '点赞(' + str11 + ')';
                thisk.text(insertstr);
                thisk.css('color', '#5f5f5f');

            }
            // indexComajax(realToken, artid);
            alert('操作成功');
        },
        error: function (error) {
            console.log(error);
        }
    });
});







//对评论回复
$(".det-mid-right").on('click', '.comsan-reply', function () {
    var artf = $(this).attr("artf");

    var arrid = $(this).attr("arrid");
    var arrthis = $(this);
    var classarr = '.comment-replyid' + arrid;
    //判断用户是否登录
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == 'null') {
        realToken = '';
    }

    if (artf == 2) {

        comreplyajax(realToken, arrid, classarr);
        $(this).attr("artf", 1);
        $(classarr).show();
    } else {
        $(this).attr("artf", 2)
        $(classarr).hide();
    }

    console.log('comment-replyid' + arrid);
});

//回复的请求执行
function comreplyajax(realToken, arcomid, classarr) {
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/home/artreply/" + arcomid,
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        success: function (response) {
            if (response.code != 1) {
                return false;
            }
            str = comreplyxuan(response.data);
            $(classarr).html(str);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
//回复的渲染页面执行
function comreplyxuan(data) {
    var len = data.data.length;
    var datas = data.data;
    var yema = data.pagination;

    //必有的回复的填充
    var str = '<div class="comment-reply-text">' +
        '<div>' +
        '<textarea name="" id="text-replys" style="resize: none;margin-top: 8px;margin-left: -25px;width: 200px;height: 80px;"></textarea>' +
        '</div>' +
        '<div id="replys-replygo" style="margin-left: 140px;border-radius: 10px;width: 35px;height: 25px;text-align: center;line-height: 25px;border: 1px solid;cursor: pointer;">回复</div></div>' +
        '</div>';

    if (len == 0) {
        return str;
    }
    //各种回复显示
    for (var i = 0; i < len; i++) {
        str += '<div class="comment-reply">' +
            '<div>';

        if (datas[i].pid_arply == null) {
            str += '<span>' + datas[i].reply_user.name + '</span>&nbsp;&nbsp;&nbsp;回复:&nbsp;&nbsp;&nbsp;<span></span>';
        } else {
            str += '<span>' + datas[i].reply_user.name + '</span>&nbsp;&nbsp;&nbsp;回复&nbsp;&nbsp;&nbsp;<span>' + datas[i].pid_arply.name + ':</span>';
        }

        str += '</div>' +
            '<div class="comment-reply-text">' + datas[i].content + '</div>' +
            '<div class="comment-reply-san"  style="margin-left: 22px;">';
        if (datas[i].is_like == true) {
            str += '<span class="comment-reply-like" arlid="' + datas[i].id + '" style="color:red;cursor: pointer;color: #5f5f5f;">已赞(' + datas[i].likecount + ')</span>';
        } else {
            str += '<span class="comment-reply-like" arlid="' + datas[i].id + '" style="cursor: pointer;color: #5f5f5f;">点赞(' + datas[i].likecount + ')</span>';
        }

        str += '<span class="comment-reply-reply" arrid="12" artid="8" artf-span="2" style="cursor: pointer;color: #5f5f5f;margin-left: 10px;">回复</span>';
        if (datas[i].is_me == true) {
            str += '<span class="comsan-del" ardid="' + datas[i].id + '" artid="' + datas[i].articleid + '" style="color:red;margin-left: 10px;">删除</span>';
        }

        str += '</div>' +
            '<div class="span-reply" style="display:none;">' +
            '<div>' +
            '<textarea name="" id="text-span-replys" style="resize: none;margin-top: 8px;width: 200px;height: 80px;"></textarea>' +
            '</div>' +
            '<div id="replys-span-replygo" style="margin-left: 165px;border-radius: 10px;width: 35px;height: 25px;text-align: center;line-height: 25px;border: 1px solid;cursor: pointer;">回复</div></div>' +
            '</div>' +
            '</div>';

    }
    //是否有显示更多的选项
    if (data.pagination.total_page > 1 && (data.pagination.total_page != data.pagination.current)) {
        str += '<div class="arreplyshowmore" total-p="' + data.pagination.total_page + '" current-p="' + data.pagination.current + '" arid="' + datas[len - 1].articleid + '" lastid = "' + datas[len - 1].id + '">显示更多</div>';
    }

    return str;
}


$(".det-mid-right").on('click', '.comment-reply-reply', function () {
    console.log(343434343)
    var artfspan = $(this).attr('artf-span');
    if (artfspan == 2) {
        $(this).attr('artf-span', 1);
        $('.span-reply').show();
    } else {
        $(this).attr('artf-span', 2);
        $('.span-reply').hide();
    }
});



//删除属于自己的评论
$(".det-mid-right").on('click', '.comsan-del', function () {
    var ardid = $(this).attr("ardid");
    var ardthis = $(this);

    //判断用户是否登录
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == 'null') {
        alert('请登录');
        return false;
    }
    //发送请求
    $.ajax({
        type: "POST",
        url: getBaseUri() + "api/opera/arcomdel",
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        data: {
            arcid: ardid,
        },
        success: function (response) {
            if (response.code != 1) {
                alert('操作失败');
                return false;
            }
            ardthis.parent().parent().remove();
            alert('操作成功');
        },
        error: function (error) {
            console.log(error);
        }
    });
});


// 评论显示中，显示更多评论
$(".det-mid-right").on('click', '.ardshowmore', function () {
    var totalp = $(this).attr('total-p');
    var currentp = parseInt($(this).attr('current-p')) + parseInt(1);
    var arid = $(this).attr('arid');
    var lastid = $(this).attr("lastid");
    //判断用户是否登录
    var realToken = getRealToken();
    if (realToken == undefined || realToken == '' || realToken == 'null') {
        realToken = '';
    }
    //发送请求
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/home/artcom/" + arid + '?page=' + currentp,
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        success: function (response) {
            if (response.code != 1) {
                return false;
            }
            //开始渲染页面

            var str = indexComXR(response.data);
            $(".ardshowmore").remove();
            //放入后面写
            $(".det-mid-right-comments-id" + lastid).after(str);
        }
    })
});


//评论请求
function indexComajax(realToken, articleid) {
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/home/artcom/" + articleid,
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + realToken,
        },
        success: function (response) {
            if (response.code != 1) {
                return false;
            }
            var str = indexComXR(response.data);
            $(".det-mid-right").html(str);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
//评论的渲染
function indexComXR(data) {
    var len = data.data.length;
    var datas = data.data;
    var yema = data.pagination;
    // console.log(yema);
    var str = '';
    if (len == 0) {
        return '<div style="font-size:18px;color:brown;margin:50% 50%">暂无评论</div>';
    }
    for (var i = 0; i < len; i++) {
        str += '<div class="det-mid-right-comments det-mid-right-comments-id' + datas[i].id + '">' +
            '<div class="comment-author">' +
            '<span class="author-comment">' + datas[i].com_user + '</span>&nbsp;&nbsp;&nbsp;评论:' +
            '</div>' +
            '<div class="comment-comment">' + datas[i].content + '</div>' +
            '<div class="comment-san">';
        if (datas[i].is_like == true) {
            str += '<span class="comsan-like" arlid="' + datas[i].id + '" artid="' + datas[i].articleid + '" style="color:red;">已赞(' + datas[i].likecount + ')</span>';
        } else {
            str += '<span class="comsan-like" arlid="' + datas[i].id + '" artid="' + datas[i].articleid + '">点赞(' + datas[i].likecount + ')</span>';
        }

        str += '<span class="comsan-reply" arrid="' + datas[i].id + '" artid="' + datas[i].articleid + '" artf="2">回复(' + datas[i].replynum + ')</span>';
        if (datas[i].is_me == true) {
            str += '<span class="comsan-del" ardid="' + datas[i].id + '" artid="' + datas[i].articleid + '" style="color:red;">删除</span>';
        }

        str += '</div>' +
            '<div class="comment-replys comment-replyid' + datas[i].id + '" style="display:none">' +
            '</div>' +
            '</div>';
    }
    if (data.pagination.total_page > 1 && (data.pagination.total_page != data.pagination.current)) {
        str += '<div class="ardshowmore" total-p="' + data.pagination.total_page + '" current-p="' + data.pagination.current + '" arid="' + datas[len - 1].articleid + '" lastid = "' + datas[len - 1].id + '">显示更多</div>';
    }
    // '<div class="comment-reply">' +
    //     '<div>' +
    //     '<span>小三</span>回复<span>小茶</span>' +
    //     '</div>' +
    //     '<div class="comment-reply-text">第二条评论的回复dasdhjjjhhjkhjkhkasdsadsadsadsadas</div>' +
    //     '</div>' +
    return str;
}

//首页head头部的标签显示
function headeCate() {
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/home/cate",
        dataType: "json",
        success: function (response) {
            if (response.code != 1) {
                return false;
            }
            var str = cateShow(response.data);
            $(".header-left-li").html(str);
        }
    });
}
headeCate();

//下拉框选择
// $.ajax({
//     type: "GET",
//     url: getBaseUri() + "api/home/cate",
//     dataType: "json",
//     success: function (response) {
//         if (response.code != 1) {
//             return false;
//         }
//         var str = '';
//         var cates = response.data;
//         var len = cates.length;
//         for (var i = 0; i < len; i++) {
//             str += '<option value="' + cates[i].cateid + '">' + cates[i].catename + '</option>';
//         }
//         $("#selectAge").html(str);
//     }
// });

//首页左边主要内容显示
$.ajax({
    type: "GET",
    url: getBaseUri() + "api/home/index",
    dataType: "json",
    success: function (data) {
        if (data.code != 1) {
            return false;
        }
        var str = indexShow(data.data.data);
        $(".con-left-cons").html(str);
        var yema = data.data.pagination;
        $('.index-box').pagination({
            pageCount: yema.total_page,
            showData: yema.per_page,
            current: yema.current_page,
            coping: true,
            callback: function (api) {
                $.ajax({
                    type: "GET",
                    url: getBaseUri() + "api/home/index?page=" + api.getCurrent(),
                    dataType: "json",
                    success: function (data) {
                        var str = indexShow(data.data.data);
                        $(".con-left-cons").html(str);
                    },
                    error: function (jqXHR) {
                        console.log(jqXHR);
                    }
                });
            },
        });
    },
    error: function (error) {
        console.log(error);
    }
});
//首页右边最新显示
$.ajax({
    type: "GET",
    url: getBaseUri() + "api/home/index-other?recornew=2",
    dataType: "json",
    success: function (data) {
        if (data.code != 1) {
            return false;
        }
        var str = rightTopShow(data.data.data);
        $(".con-right-new").html(str);
        var yema = data.data.pagination;
        $('.new-box').pagination({
            pageCount: yema.total_page,
            showData: yema.per_page,
            current: yema.current_page,
            mode: 'fixed',
            callback: function (api) {
                $.ajax({
                    type: "GET",
                    url: getBaseUri() + "api/home/index-other?recornew=2&page=" + api.getCurrent(),
                    dataType: "json",
                    success: function (data) {
                        var str = rightTopShow(data.data.data);
                        $(".con-right-new").html(str);
                    },
                    error: function (jqXHR) {
                        console.log(jqXHR);
                    }
                });
            },
        });
    },
    error: function (error) {
        console.log(error);
    }
});
//首页右边推荐显示
$.ajax({
    type: "GET",
    url: getBaseUri() + "api/home/index-other?recornew=1",
    dataType: "json",
    success: function (data) {
        if (data.code != 1) {
            return false;
        }
        var str = rightTopShow(data.data.data);
        $(".con-right-rec").html(str);
        var yema = data.data.pagination;
        $('.rec-box').pagination({
            // totalData: yema.total,
            pageCount: yema.total_page,
            showData: yema.per_page,
            current: yema.current_page,
            coping: true,
            callback: function (api) {
                $.ajax({
                    type: "GET",
                    url: getBaseUri() + "api/home/index-other?recornew=1&page=" + api.getCurrent(),
                    dataType: "json",
                    success: function (data) {
                        var str = rightTopShow(data.data.data);
                        $(".con-right-rec").html(str);
                    },
                    error: function (jqXHR) {
                        console.log(jqXHR);
                    }
                });
            },
        });
    },
    error: function (error) {
        console.log(error);
    }
});

//首页个人作品
function myContent() {
    var token = getRealToken();
    if (token == '' || token == undefined || token == 'null') {
        return false;
    }
    $.ajax({
        type: "GET",
        url: getBaseUri() + "api/opera/my-contents",
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + token,
        },
        success: function (data) {
            if (data.code != 1) {
                $(".con-right-myself").html('');
            }
            var str = rightTopShow(data.data.data);
            $(".con-right-myself").html(str);
            var yema = data.data.pagination;
            $('.my-box').pagination({
                pageCount: yema.total_page,
                showData: yema.per_page,
                current: yema.current_page,
                mode: 'fixed',
                callback: function (api) {
                    $.ajax({
                        type: "GET",
                        url: getBaseUri() + "api/opera/my-contents?page=" + api.getCurrent(),
                        dataType: "json",
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                        success: function (data) {
                            var str = rightTopShow(data.data.data);
                            $(".con-right-myself").html(str);
                        },
                        error: function (jqXHR) {
                            console.log(jqXHR);
                        }
                    });
                },
            });
        }
    });
}
myContent();




//首页渲染cate方法
function cateShow(data) {
    var str = '';
    var cates = data;
    var len = cates.length;
    for (var i = 0; i < len; i++) {
        str += '<li><a href="javascript:void(0);" class="cateClick" cateid="' + cates[i].cateid + '">' + cates[i].catename + '</a></li>';
    }
    return str;
}
//首页渲染主要内容页面
function indexShow(data) {
    var str = '';
    var articles = data;
    var len = articles.length;
    for (var i = 0; i < len; i++) {
        str += '<div class="con-left-con" arid="' + articles[i].id + '">' +
            '<div class="suoshu">' +
            '<span class="arusername">' + articles[i].article_user.name + '&nbsp;&nbsp;</span>' +
            '<span class="artime">&nbsp;&nbsp;' + articles[i].created_at + '</span>' +
            '</div>' +
            '<div class="zhucon" title="' + articles[i].content + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            articles[i].content.substring(0, 100) +
            '...</div>' +
            '<div class="other">' +
            '<p class="arcate">分类:' + articles[i].article_cate.name + '</p>' +
            '<p>' +
            '<span class="arlikes" arid="' + articles[i].id + '">点赞(' + articles[i].like + ')&nbsp;&nbsp;</span>' +
            '<span class="arcomments">&nbsp;&nbsp;评论(' + articles[i].pv + ')</span>' +
            '</p>' +
            '</div>' +
            '</div>';
    }
    return str;
}
//首页渲染推荐和最新的方法
function rightTopShow(data) {
    var str = '';
    var newArticles = data;
    var len = newArticles.length;
    for (var i = 0; i < len; i++) {
        str += '<p arid="' + newArticles[i].id + '"><span title="' + newArticles[i].content + '">' + newArticles[i].content.substring(0, 12) + '...</span><span class="imglike"><img src="/static/home/img/like.png" alt=""></span></p>';
    }
    return str;
}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}