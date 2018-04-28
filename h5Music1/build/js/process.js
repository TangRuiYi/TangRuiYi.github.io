(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPercent = 0;
    var startTime;
    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute *60;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(duration){
        lastPercent = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }
    function updata(precent){
        var curTime = precent * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        var precentage = (precent - 1) *100 + '%';
        $scope.find('.pro-top').css({
            'transform':"translateX(" + precentage + ")"
        })
    }
})(window.Zepto,window.player || (window.player = {}))