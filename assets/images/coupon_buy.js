/**
 * 大促主会场 优惠券区域 【一元购】【蜂蜜兑换】【活动按钮..】逻辑
 * Created by wy on 2017/8/18.
 */
var $coupon = $('[data-coupon="1"]'),
    $onebuy_btn = $('[data-onebuy="1"]'),
    $honey_btn = $('[data-honey="1"]'),
    no_onebuy_class = 'unt-mon';            // 一元购不能买的样式
$honey_btn.addClass('js_honeybuy');
if (window.Env.UID != 0) {
    //1元购
    $.post('/sales/activity/ajax.php', {act: 'bJoin'}, function (res) {
        if (res.data == 1) {
            //未参加过
            $onebuy_btn.addClass('js_onebuy');
            oneBuy();
        } else {
            //已经参加过
            $onebuy_btn.addClass('unt-mon');
        }
    }, 'json');
    $.get('/sales/activity/ajax.php',{act : 'getDrawTimes'},function (res) {
        //以下是活动小游戏 逻辑 ，不一样的时候就改！就改！就改！随便改
        if(_b){
            _b.drawTime = res.data;
        }
        if(res.data <= 0 ){
            $(".c_btn.btn-begin").addClass("disable");
        }else{
            _b.show_begin();
        }
    },'json')

} else {
    //跳转登录
    $coupon.on('click','[data-onebuy],[data-honey],[data-battle]', function () {
        SalesApp.gotoLogin();
    });
}
//    一元购买
function oneBuy() {
    $('.js_onebuy').on('click', function () {
        if (window.Env.UID != 0) {
            $.post('/sales/activity/ajax.php', {act: 'aGetPayByMoney'}, function (res) {
                if (res.data.code == 1000) {
                    // 成功
                    $onebuy_btn.addClass("unt-mon");
                    if (res.data.url) {
                        if(SalesApp.isApp() && promotion_stage == 'preview'){
                            MFWAPP.webview.openNewPage({
                                url: res.data.url
                            });
                        }else{
                            window.location.href = res.data.url;
                        }
                    }
                } else {
                    alert(res.data.mes);
                    return;
                }
            }, 'json');

        } else {
            SalesApp.gotoLogin();
        }
    });
}
//    50 蜂蜜购买
(function honeyBuy() {
    $('.js_honeybuy').on('click', function () {
        if(SalesApp.isAndroid() ||SalesApp.isApp() ||SalesApp.isIos() ){
            honeyBuyMobile();
        }else{
            honeyBuyPC();
        }
    });
})();
//    50 蜂蜜购买 PC
function honeyBuyPC() {
    if (window.Env.UID != 0) {
        mConfirm('是否花50蜂蜜兑换?',function (ok) {
            if(ok) {
                $.post('/sales/activity/ajax.php', { act: 'aGetPayByHoney' }, function (res) {
                    if (res.data.code == 1000) {
                        mAlert('恭喜你！成功兑换千元优惠券大礼包！');
                    } else if (res.data.code == 1004) {
                        mAlert('您的蜂蜜不足，无法兑换');
                    } else {
                        mAlert(res.data.mes);
                        return;
                    }
                }, 'json');
            }
        })
    } else {
        SalesApp.gotoLogin();
    }
}
function honeyBuyMobile(){
    if (window.Env.UID != 0) {
        var honey = new Pieces({
            type: "alert",
            title: "是否花50蜂蜜兑换？",
//                        message: "",
            buttons: [
                {
                    text: "取消",
                    fontColor:"#ff9d00",
                    backColor:"#fff",
                    callback: function () {

                    }
                },
                {
                    text: "确定",
                    fontColor:"#fff",
                    backColor:"#ff9d00",
                    callback: function () {
                        $.post('/sales/activity/ajax.php', {act: 'aGetPayByHoney'}, function (res) {
                            if (res.data.code == 1000) {
                                var honeyS = new Pieces({
                                    //对话框提示信息
                                    title: "恭喜你！成功兑换千元优惠券大礼包！",
                                    buttons: [
                                        {
                                            text: "我知道了",
                                            fontColor:"#ff9d00",
                                            backColor:"#fff",
                                        }
                                    ]
//                                                message: "",
                                });
                                honeyS.creat();

                            } else if (res.data.code == 1004) {
                                var honeyF = new Pieces({
                                    //对话框提示信息
                                    title: "您的蜂蜜不足，无法兑换",
                                    buttons: [
                                        {
                                            text: "我知道了",
                                            fontColor:"#ff9d00",
                                            backColor:"#fff",
                                        }
                                    ]
                                });
                                honeyF.creat();
                            } else {
                                alert(res.data.mes);
                                return;
                            }
                        }, 'json');

                    }
                }
            ],
        });
        honey.creat();
    } else {
        SalesApp.gotoLogin();
    }
}