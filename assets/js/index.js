$(function() {


    // ===============主轮播图start===========
    var index = 0;
    var len = $('.ppt-main li').length;
    var timer = 0;


    function run() {
        timer = setInterval(function() {
            $('.ppt-main li').eq(index).fadeOut(600);
            $('.pptsider-bar img').eq(index).removeClass('pactive');
            index++;
            if (index > len - 1) {
                index = 0;
            }

            $('.pptsider-bar img').eq(index).addClass('pactive');
            $('.ppt-main li').eq(index).fadeIn(600);
        }, 3000)
    }
    run();
    $('.ppt').mouseover(function() {
        clearInterval(timer);
    }).mouseout(function() {
        run();
    })


    $('.pptsider-bar li').click(function() {

            $('.ppt-main li').eq(index).fadeOut(800);
            $('.pptsider-bar img').eq(index).removeClass('pactive');


            index = $(this).index();


            $('.pptsider-bar img').eq(index).addClass('pactive');
            $('.ppt-main li').eq(index).fadeIn(800);

        })
        // ===============主轮播图end===========



    // ==========侧边栏点击左右滑动start=========
    var num = 0;



    $('.section-btn li').click(function() {
            $('.section-btn li').eq(num).removeClass('btnactive');

            num = $(this).index();
            $('.section-btn li').eq(num).addClass('btnactive');
            $('.small-ppt').stop().animate({
                left: -num * 260
            }, 500)
            console.log(index);
        })
        // ==========侧边栏点击左右滑动end===========


        // ==========侧边栏上下滚动start==========
    $('.activity-list').scroll(function(){
        var sTop = $(this).scrollTop();
        var sHeight = $(this).get(0).scrollHeight;
        // console.log($(this).height())

        var top = sTop/sHeight*$(this).height();
        if(top+$('.line').height() >= $(this).height()){
            top = $(this).height() -  $('.line').height()
        }
        $('.line').css('top',top);
    })


        // ==========侧边栏上下滚动end============




})
