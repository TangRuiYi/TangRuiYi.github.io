// import { EAFNOSUPPORT } from "constants";


(function($,root){
    var lasetPercent = 0,
        curDuration,frameId,startTime;
    
    function update(percent){
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        var percentage = (percent - 1) *100  + "%";
        $scope.find(".pro-top").css({
            "transform ": "translateX(" + percentage +")"
        })

    }   
    
    function start(percentage){
        lasetPercent = (percentage === undefined) ? lasetPercent :percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new  Date().getTime();
            var percent  = lasetPercent + (curTime - startTime) /(curDuration *1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId);
                $scope.find(".next-btn").trigger("click");
            }
        }
        frame();
    }

    function stop(percentage){
        var stopTime = new Date().getTime();
        lasetPercent = lasetPercent + (stopTime - startTime) /(curDuration *1000);
        cancelAnimationFrame(frameId)
    }

    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute *60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(duration){
        lasetPercent = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }

    root.processor = {
        renderAllTime : renderAllTime,
        start:start,
        update:update,
        stop:stop
    }
})(window.Zepto,window.player || (window.player = {}))