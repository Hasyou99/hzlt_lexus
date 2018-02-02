function SetHtmlFont(){
  scaleW = window.innerWidth / 320;
  scaleH = window.innerHeight / 480;

  console.log(scaleH,scaleW);
  var resizes = document.querySelector('html');

  resizes.style.fontSize = parseInt(10*scaleH,10) + 'px';
}
SetHtmlFont();

window.onload = function(){
  var nody= document.querySelector('body');
  nody.classList.remove('is-loading');


  var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    // loop:true,
    // pagination: '.swiper-pagination',
    //virtualTranslate : true,
    mousewheelControl: true,
    onInit: function(swiper) {
      swiperAnimateCache(swiper);
      swiperAnimate(swiper);
    },
    onSlideChangeEnd: function(swiper) {
      swiperAnimate(swiper);
      var page_show = document.getElementById('page_show');

      page_show.innerText = parseInt(swiper.activeIndex, 10) + 1; //切换结束时，分液器改变slide

      var prog = document.getElementById('line');
      prog.style.width = (parseInt(swiper.activeIndex, 10) + 1) * 10 + '%';
      SetHtmlFont();

      var arrow = document.getElementById('array');
      if(page_show.innerText==10){
        arrow.style.animationPlayState = "paused";
        arrow.style.WebkitAnimationPlayState = "paused";
      }else{
        arrow.style.animationPlayState = "running";
        arrow.style.WebkitAnimationPlayState = "running";
      }

    },
    onTransitionEnd: function(swiper) {
      swiperAnimate(swiper);
    },


    watchSlidesProgress: true,

    onProgress: function(swiper) {
      for (var i = 0; i < swiper.slides.length; i++) {
        var slide = swiper.slides[i];
        var progress = slide.progress;
        var translate = progress * swiper.height / 4;
        scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
        var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
        slide.style.opacity = opacity;
        es = slide.style;
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform =
          'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';

      }
    },

    onSetTransition: function(swiper, speed) {
      for (var i = 0; i < swiper.slides.length; i++) {
        es = swiper.slides[i].style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration =
          es.OTransitionDuration = es.transitionDuration = speed + 'ms';

      }
    },
  });


  function controMusic(){
    //播放器控制
      var audio = document.getElementById('mp3Btn'),
          audio_div = document.getElementById('audio_div')

          audio_div.addEventListener('click', function(){
                event.stopPropagation();
                if(audio.paused) //如果当前是暂停状态
                  {
                      audio.play();//播放
                      audio_div.style.animationPlayState = "running";
                      audio_div.style.WebkitAnimationPlayState = "running";
                      return;
                  }
          
                  //当前是播放状态
                  audio.pause(); //暂停
                  audio_div.style.animationPlayState = "paused";
                  audio_div.style.WebkitAnimationPlayState = "paused";
          },false)
  }

  controMusic();
}
