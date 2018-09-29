//分页样式先写定，留待后续调试
// todo

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
        $('.M-box1').pagination({
            totalData: yema.total,
            showData: yema.per_page,
            current: yema.current_page,
            coping: true,
            callback: function (api) {
                $.ajax({
                    type: "GET",
                    url: getBaseUri() + "/api/home/index?page=" + api.getCurrent(),
                    dataType: "json",
                    success: function (data) {
                        var str = su(data);
                        $('.con-left').html(str);
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
            '<div class="zhucon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
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