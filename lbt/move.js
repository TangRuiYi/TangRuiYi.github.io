function getStyle(obj,attr){
    if(obj.attr){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,false)[attr];
    }

}
function startMove(obj,json,func){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
       
        var speed,iCur;
     
        iCur = parseInt(getStyle(obj,'left'));
        
        speed = (json['left'] - iCur)/7;
        console.log(speed);
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if(json['left'] == iCur){
            clearInterval(obj.timer);
            typeof func == 'function' ? func() : '';
        }else{
            obj.style['left'] = iCur + speed + 'px';
        }
        
    },30)
}