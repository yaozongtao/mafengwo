/**
 * Created by wy on 2017/8/18.
 */
function battle(container, start_btn) {
    this.area_con = container;
    this.btn_begin = start_btn;
    this.count = 1;
    this.game_st = 0;
    this.timeLine = {};
    this.vs = 0;
    this.choose = 0;
    this.drawTime = 3;
    this.pking = false;
    this.awardLine = 0;
    this.noawardLine = 0;
    this.coupon_flag = 5;
    this.point = 1;
    this.battleMap = {
        "0": "stone",
        "1": "scissors",
        "2": "cloth",
        "stone": "0",
        "scissors": "1",
        "cloth": "2",
    };
    this.awardMap = {
        "392": "https://p1-q.mafengwo.net/s10/M00/CD/30/wKgBZ1mU_VmAALleAAA8KoZbs_0957.png", //1蜂蜜
        "353": "https://c2-q.mafengwo.net/s10/M00/4C/DA/wKgBZ1mWvxKAe_BeAAAWK96IxLI490.png",//2 m
        "356": "https://c2-q.mafengwo.net/s10/M00/CD/2F/wKgBZ1mU_VmAZDh8AAA9he0oyVo872.png", //5 m
        "359": "https://n1-q.mafengwo.net/s10/M00/4C/F4/wKgBZ1mWvxmAD48yAAAWlLCHnNk900.png",//20 mi
        "362": "https://c1-q.mafengwo.net/s10/M00/4C/F4/wKgBZ1mWvxmANZWGAAAgiCSLZV8428.png", //50 mi
        "365": "https://n4-q.mafengwo.net/s10/M00/4B/7E/wKgBZ1mVeZeAbdz4AACP0kxbt6M332.png", //5 yuan
        "368": "https://c4-q.mafengwo.net/s10/M00/CB/35/wKgBZ1mVZCuAUVbJAACQ1cpJWw0623.png", //10 yuan
        "371": "https://p1-q.mafengwo.net/s10/M00/CB/35/wKgBZ1mVZCuAQfOLAACRxvKdmng963.png", //30 yuan
        "374": "https://p1-q.mafengwo.net/s10/M00/CB/35/wKgBZ1mVZCuAfDmNAADFMXRiJpA836.png", //80 yuan
        "377": "https://p1-q.mafengwo.net/s10/M00/CB/36/wKgBZ1mVZCuAOpMKAADFc4zUMMo368.png", //100 yuan
        "380": "https://p2-q.mafengwo.net/s10/M00/CB/36/wKgBZ1mVZCuAP6z0AADGg7BUT_0373.png",    //1000yuan
        "383": "https://c4-q.mafengwo.net/s10/M00/CD/78/wKgBZ1mU_WOAJUofAACcUPsk1uM728.png", //包
        "386": "https://c4-q.mafengwo.net/s10/M00/CD/78/wKgBZ1mU_WOAYf47AACEO_jbVK4315.png", //水杯
        "389": "https://c2-q.mafengwo.net/s10/M00/CD/78/wKgBZ1mU_WOAGgXTAABXBLISmJ4996.png", //数据线
    }

}
battle.prototype.show_begin = function() {
    var _this = this;
    this.game_st = setInterval(function() {
        _this.count++;
        if(_this.count % 2 == 0) {
            _this.area_con.classList.add('run');
            _this.btn_begin.classList.remove('bounceIn');
        } else {
            _this.area_con.classList.remove('run');
            _this.btn_begin.classList.add('bounceIn');
        }
    }, 1000)
}
battle.prototype.pause = function() {
    clearInterval(this.game_st);
}
battle.prototype.showGame = function() {
    this.pause();
    this.init();
    this.timeLine = new TimelineMax();
    this.timeLine
        .to("#battle", .8, {
            ease: Bounce.easeOut,
            y: -470
        });
    $("#mask_bg").show();
}
battle.prototype.removeGame = function() {
    this.show_begin();
    this.timeLine = new TimelineMax();
    this.timeLine
        .to("#battle", .5, {
            ease: Back.easeIn,
            y: -1200,
            onComplete: function() {
                $("#mask_bg").hide();
                $("#pk_btn").removeClass("pking");
            }
        });
}
battle.prototype.PK = function() {
    if ($("#pk_btn").hasClass("no-time") || $("#pk_btn").hasClass("pking")) return;
    $("#pk_btn").addClass("pking");
    this.pking = true;
    this.award_id = 0;
    $(".vs-hand").addClass("pking");
    var _this = this;
    var r = ((Math.random() * 100 << 2) % 3);
    var result = this.juide(r);
    this.coupon_flag = 5;

    if (result == 1) {
        this.drawTime--;
        $.get('/sales/activity/ajax.php', {act: 'PromotionDraw', draw_key: window.Env.DRAW_KEY}, function (res) {
            _this.award_id = res.data.award_id;
            if (res.data.need_addr) {
                _this.coupon_flag = 1;
                $(".award-name #c_address_span").show();
            } else {
                if (parseInt(res.data.coupon_id) > 1000) {
                    _this.coupon_flag = 2;
                }
                $(".award-name #c_address_span").hide();
            }
            $(".award-name #c_award_name").html(res.data.name);
            if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
                _this.MCoutonDown(result, _this.coupon_flag, r);
            } else {
                _this.PCCountDown(result, _this.coupon_flag, r);
            }
        }, 'json');
    } else if (result === 2) {
        this.drawTime--;
        $.get('/sales/activity/ajax.php', {act: 'reduceTimes'}, function () {
            if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
                _this.MCoutonDown(result, _this.coupon_flag, r);
            } else {
                _this.PCCountDown(result, _this.coupon_flag, r);
            }
        })
    } else {
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            _this.MCoutonDown(0, _this.coupon_flag, r);
        } else {
            _this.PCCountDown(0, _this.coupon_flag, r);
        }
    }
}

battle.prototype.PCCountDown = function(f,c,r){
    var _this = this;
    this.countDown(function() {
        switch(f) {
            case 1: //win
                _this.showAward(c); //falg 1:实物奖品, 2: 优惠券 5:蜂蜜
                break;
            case 2: //lose
                _this.noAward(1);
                break;
            case 0: //equal
                _this.noAward(0);
                break;
        }
    }, r);
}
battle.prototype.MCoutonDown = function(f,c,r){
    console.log("pk result : "+f +"r 最后定格 位置 " + r + " -c "+c);
    var _this = this;
    this.countDown(function(){
        switch(f){
            case 0:		//equal
                _this.MshowAward(4);
                break;
            case 1:		//win
                _this.MshowAward(c);		//falg 1:实物奖品, 2: 优惠券 5:蜂蜜
                break;
            case 2:		//lose
                _this.MshowAward(3);
                break;

        }
    },r);
}

battle.prototype.countDown = function(callback, r) {
    $("#pk_btn,#pk_tip").fadeOut();
    $("#count_down").show();
    var _this = this;
    setTimeout(function() {
        _this.waitChoose();
        $(".vs-hand").addClass(_this.battleMap[r]);
        setTimeout(function() {
            callback();
            $("#pk_btn").removeClass("pking");
            console.log('count-down callback ---->>> remove class pking');
        }, 800)
    }, 3000)
}
battle.prototype.showAward = function(flag) {
    var _this = this;
    $("#award_wrapper").show();
    if(flag === 1) { //实物
        $(".address-btn").css("display", "inline-block");
    } else if(flag === 2) { //优惠券
        $(".coupon-btn").css("display", "inline-block");
        $(".back-btn").css("display", "inline-block");
    } else if(flag === 5){  //蜂蜜
        $(".back-btn").css("display", "inline-block");
    }
    $("#award_img").attr("src", this.awardMap[this.award_id]);

    this.awardLine = new TimelineMax();
    this.awardLine
        .to(".box.battle-sprite.active", .5, {
            ease: Sine.easeIn,
            scale: 1.3
        })
        .to(".vs-hands-box", .5, {
            ease: Sine.easeIn,
            scale: 0.7,
            onComplete: function() {
                $(".game_result.win").show()
            }
        }, '-=0.5')
        .fromTo(".game_result.win", .5, {
            ease: Bounce.easeOut,
            scale: 2,
            opacity: 0
        }, {
            ease: Bounce.easeOut,
            scale: 1,
            opacity: 1
        }, "-=0.25")
        .staggerTo(["#stone", "#scissors", "#cloth"], .3, {
            ease: Sine.easeOut,
            x: 300
        }, 0.15, "+=1")
        .to(".vs-hands-box", .3, {
            ease: Sine.easeOut,
            x: -400,
        }, "-=0.3")
        .to(".game_result.win", .2, {
            opacity: 0
        })
        .to("#award_info", 1, {
            opacity: 1
        })
        .fromTo("#award_wrapper img", .5, {
            ease: Bounce.easeOut,
            scale: 1.3,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            onComplete: function() {
                $(".game-wrapper").hide();
            }
        }, "-=1");
}
battle.prototype.MshowAward = function(flag){
    console.log("MshowAward  " + flag);
    var _this = this;
    $("#award_wrapper").show();
    if(flag === 1){			    //实物
        $(".address-btn").css("display","inline-block");
        $(".back-btn").hide();
    }else if(flag === 2){		//优惠券
        $(".coupon-btn").css("display","inline-block");
        $(".back-btn").css("display","inline-block");
    }else if(flag === 3 || flag === 4 ){
        $("#award_img").attr("src","https://c1-q.mafengwo.net/s10/M00/38/8F/wKgBZ1mVpJKANtasAAA0RiLA5KM168.png");
        $(".back-btn").css("display","inline-block");
    }else{
        $(".back-btn").css("display","inline-block");
    }

    //get award img map
    if(flag ===1 || flag === 2 || flag === 5 ){      //中奖了
        $("#award_img").attr("src", this.awardMap[this.award_id]);
    }

    this.awardLine = new TimelineMax();
    this.awardLine
        .to(".box.battle-sprite.active",.5,{ ease:Sine.easeIn,scale:1.3})
        .to(".vs-hands-box",.5,{ ease:Sine.easeIn,scale:0.8,onComplete:function(){
            if(flag == 1 || flag == 2 || flag ==5){
                $(".game_result.win").show()
                $("#award_info .award-name").show();
            }
            else if(flag == 3){
                $(".game_result.lose").show()
                $("#award_info .award-name").hide();
            }else{
                $("#award_info .award-name").hide();
                $(".game_result.equal").show()
            }

        }},'-=0.5')
        .to(".vs-hands-box",.3,{ ease:Sine.easeOut,y:-400 })
        .fromTo(".game_result",.5,{ ease:Bounce.easeOut,scale:2,opacity:0},{ ease:Bounce.easeOut,scale:1,opacity:1 })
        .staggerTo(["#stone","#scissors","#cloth"],.3,{ ease:Sine.easeOut,y:300 },0.15,"-=0.8")
        .to("#award_info",1,{ opacity:1 })
        .fromTo("#award_wrapper img",.5,{ ease:Bounce.easeOut,scale:1.3,opacity:0 },{ scale:1,opacity:1,onComplete:function(){
            _this.pking = false;
            $(".game-wrapper").hide();
        }},"-=1")
    ;
}
battle.prototype.noAward = function(flag) {
    $("#award_wrapper").show();
    var _this = this;
    this.noawardLine = new TimelineMax();
    this.noawardLine
        .to(".box.battle-sprite.active", .5, {
            ease: Sine.easeIn,
            scale: flag ? 0.7 : 1.3
        })
        .to(".vs-hands-box", .5, {
            ease: Sine.easeIn,
            scale: 1.3,
            onComplete: function() {
                if(flag)
                    $(".game_result.lose").show()
                else
                    $(".game_result.equal").show()
            }
        }, '-=0.5')
        .fromTo(".game_result.lose", .5, {
            ease: Bounce.easeOut,
            scale: 2,
            opacity: 0
        }, {
            ease: Bounce.easeOut,
            scale: 1,
            opacity: 1,
            onComplete: function() {
                $(".play-again-btn").show();
                _this.pking = false;
            }
        }, "-=0.5");
}
battle.prototype.init = function() {
    this.pking = false;
    if(this.drawTime) {
        $("#drawTime").html(this.drawTime);
        $("#pk_btn,#pk_tip").fadeIn();
    } else {
        $("#pk_tip").hide();
        $("#pk_btn").addClass("no-time").show();
    }
    this.noawardLine && this.noawardLine.pause(0);
    this.awardLine && this.awardLine.pause(0);
    this.waitChoose();
    $(".battle-game .award-info .battle-sprite").hide();
    $(".play-again-btn").hide();
    $(".game_result").hide();
    $("#restart_game").hide();
    $("#count_down").hide();
    $("#pk_btn").removeClass("pking");
    $(".game-wrapper").show();
}
battle.prototype.waitChoose = function() {
    $(".vs-hand").removeClass('stone cloth scissors pking');
}
battle.prototype.juide = function(r) {
    var differ = this.point - r;
    if(differ == 0) {
        return 0;
    } else if(differ == -1 || differ == 2) { //玩家赢了
        return 1;
    } else {
        return 2; //电脑赢了
    }
}
battle.prototype.chooseBox = function(el) {
    this.point = this.battleMap[el.attr("data-role")];
    el.addClass("active");
    el.siblings().removeClass("active");
}



