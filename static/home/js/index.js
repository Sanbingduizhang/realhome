//点击单个显示详情内容的
$(".button-close-det").click(function () {
    $(".det-head").html('<img src="/static/common/img/timg.gif" alt="" style="width: 30px;">');
    $(".det-mid-text").html('<img src="/static/common/img/timg.gif" alt="" style="width: 300px;">');
    $(".det-mid-right").html('<img src="/static/common/img/timg.gif" alt="" style="width: 260px;">');
    $("#bgdet").hide();
});
$(".con-left-cons").on('click', '.con-left-con', function () {
    //获取arid
    var articleid = $(this).attr('arid');
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
        },
        error: function (error) {
            console.log(error);
        }
    });

    //评论
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
    //显示渲染好的页面
    $("#bgdet").show();
});

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
        str += '<div class="det-mid-right-comments">' +
            '<div class="comment-author">' +
            '<span class="author-comment">' + datas[i].com_user + '</span>评论:' +
            '</div>' +
            '<div class="comment-comment">' + datas[i].content + '</div>' +
            '<div class="comment-san">' +
            '<span class="comsan-like" arlid="' + datas[i].id + '">点赞(' + datas[i].likecount + ')</span>' +
            '<span class="comsan-reply" arrid="' + datas[i].id + '">回复(' + datas[i].com_reply_count + ')</span>';
        if (datas[i].is_me == true) {
            str += '<span class="comsan-del">删除</span>';
        }

        str += '</div>' +
            '<div class="comment-replys comment-replyid' + datas[i].id + '">' +
            '</div>' +
            '</div>';
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
        url: getBaseUri() + "/api/home/cate",
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
$.ajax({
    type: "GET",
    url: getBaseUri() + "/api/home/cate",
    dataType: "json",
    success: function (response) {
        if (response.code != 1) {
            return false;
        }
        var str = '';
        var cates = response.data;
        var len = cates.length;
        for (var i = 0; i < len; i++) {
            str += '<option value="' + cates[i].cateid + '">' + cates[i].catename + '</option>';
        }
        $("#selectAge").html(str);
    }
});

//首页左边主要内容显示
$.ajax({
    type: "GET",
    url: getBaseUri() + "/api/home/index",
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
                    url: getBaseUri() + "/api/home/index?page=" + api.getCurrent(),
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
    url: getBaseUri() + "/api/home/index-other?recornew=2",
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
                    url: getBaseUri() + "/api/home/index-other?recornew=2&page=" + api.getCurrent(),
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
    url: getBaseUri() + "/api/home/index-other?recornew=1",
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
                    url: getBaseUri() + "/api/home/index-other?recornew=1&page=" + api.getCurrent(),
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
        url: getBaseUri() + "/api/opera/my-contents",
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
                        url: getBaseUri() + "/api/opera/my-contents?page=" + api.getCurrent(),
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
            '<span class="arlikes">点赞(' + articles[i].like + ')&nbsp;&nbsp;</span>' +
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
        str += '<p><span title="' + newArticles[i].content + '">' + newArticles[i].content.substring(0, 12) + '...</span></p>';
    }
    return str;
}