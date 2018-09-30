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
            // totalData: yema.total,
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
            // totalData: yema.total,
            showData: yema.per_page,
            current: yema.current_page,
            // coping: true,
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
    if (token == '' || token == 'undefined') {
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
                // totalData: yema.total,
                showData: yema.per_page,
                current: yema.current_page,
                // coping: true,
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
        str += '<div class="con-left-con">' +
            '<div class="suoshu">' +
            '<span>' + articles[i].article_user.name + '&nbsp;&nbsp;</span>' +
            '<span>&nbsp;&nbsp;' + articles[i].created_at + '</span>' +
            '</div>' +
            '<div class="zhucon" title="' + articles[i].content + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            articles[i].content.substring(0, 100) +
            '...</div>' +
            '<div class="other">' +
            '<p>分类:' + articles[i].article_cate.name + '</p>' +
            '<p>' +
            '<span>点赞(' + articles[i].like + ')&nbsp;&nbsp;</span>' +
            '<span>&nbsp;&nbsp;评论(' + articles[i].pv + ')</span>' +
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