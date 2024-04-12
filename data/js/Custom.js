function kaygb_copy() {
    $(document).ready(function() {
        $("body").bind('copy', function(e) {
            hellolayer()
        })
    });

    function hellolayer() {
        $.message({
            message: "尊重原创，转载请注明出处<br/>本文作者：歆宋<br/>原文链接：" + window.location.href,
            title: "复制成功",
            type: "success",
            autoHide: !1,
            time: "3000"
        })
    }
}
$.message({
    message: "为了网站的正常运行，请不要使用广告屏蔽插件，谢谢(❁´◡`❁)",
    title: "网站加载完成",
    type: "success",
    autoHide: !1,
    time: "3000"
})