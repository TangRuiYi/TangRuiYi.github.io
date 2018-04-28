var $ = window.Zepto;
var root  = window.player;
var $scope = $(document.body);
var index = 0 ;
var songList;
var audio = new root.audioControl();

function bindTouch(){
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart',function(){
        root.processor.stop();
    }).on('touchmove',function(e){
        console.log(e.changedTouches[0]);
        var x =  e.changedTouches[0].clientX;
        console.log(x);
        console.log(left);
        var per = (x - left)/ width;
        if(per < 0 ||per > 1){
            per = 0;
        }
        root.processor.update(per);
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x- left) /width;
        if(per < 0 ||per > 1){
            per = 0;
        }
        var curDuration = songList[controlManager.index].duration;
        var curTime = curDuration * per;
        audio.jumpToplay(curTime);
        root.processor.start(per);
        $scope.find('.play-btn').addClass('pause');
    })
}




function bindEvent(songList){
    $scope.on('play:change',function(event,index,flag){
        audio.getAudioSource(songList[index].audio);

        if(audio.status === 'play'){
            audio.play();
            root.processor.start();
        }
        root.processor.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.processor.update(0)
    })

    $scope.on('click','.like-btn',function(){
        $(this).toggleClass('liking');
    })
    $scope.on('click','.prev-btn',function(){
        var index = controlManager.prev();
        $scope.trigger("play:change",index);
    })
    $scope.on('click','.next-btn',function(){
        var index = controlManager.next();
        $scope.trigger("play:change",index);
    })
    $scope.on('click','.play-btn',function(){
        if(audio.status === 'play'){
            audio.pause();
            root.processor.stop();
        }else{
            root.processor.start();
            audio.play();
        }
        $(this).toggleClass('pause');
    })
    $scope.on('click','.list-btn',function(){
        
    })
}


function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            songList = data;
            bindEvent(songList);
            bindTouch();
            root.render(data[0]);
            
            controlManager = new root.controlManager(data.length);

            $scope.trigger('play:change',0)
        },
        error:function(){
            console.log('error');
        }
    })
}

getData('../../json/data.json');