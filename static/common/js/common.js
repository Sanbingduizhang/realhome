//加在首页和尾页
$("#top").load("head.html");
$("#buttom").load("foot.html");
//部分的js事件
//鼠标在头像显示或者隐藏相关信息
$("#top").on('mouseenter','.header-right',function() {
    //获取自定义属性，来判断显示什么--如果已经登陆，则显示个人信息，否则显示登陆注册窗口
    var isclick = $(".imghead").attr("isClick");
    if(isclick == false) {
        console.log(1111);
    } else {
        $(".head-mess").show();
    }
    
});
$("#top").on('mouseleave','.header-right',function() {
    $(".head-mess").hide();
});
//获取自定义属性
