function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}
function Move(obj, target) {
    // console.log('hello');
    clearInterval(obj.timer);
    var speed, iCur;
    obj.timer = setInterval(function () {
        flag = true;
        iCur = parseInt(getStyle(obj, 'left'));
        speed = (target - iCur) / 9;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // console.log(obj.offsetLeft);

        if (target == iCur) {
            clearInterval(obj.timer);
            flag = false;
            changeIndex(index);
        } else {
            obj.style.left = iCur + speed + 'px';
        }

    }, 30)
}
function loop(obj) {

    flag = false;
    leftButton.onclick = function () {


        if (flag == false) {
            var temp = true;
            clearInterval(obj.time);
            flag = true;
            if (position == 0) {
                // console.log('left');s
                obj.style.left = '-2600px';
                index = 4 ;
                temp = false;
            }

            position = parseInt(obj.style.left) + 520;

            if( temp == true){
                index = (index-- == 0 ) ? 4: index;
            }
            Move(obj, position);

            timer(obj, position);
        }

    }
    rightButton.onclick = function () {


        if (flag == false) {
            // console.log('right');
            var temp = true;
            clearInterval(obj.time);
            flag = true;
            if (position == -2600) {
                obj.style.left = '0px';
                // index = 0;
                // temp = false;
            }
            // console.log(obj);
            if(obj.style.left == ''){
                position = -520;
            }else{
                position = parseInt(obj.style.left) - 520;
            }

            if(temp == true){
                index = (index++ == 4 ) ? 0 : index; 
                console.log(position);
                console.log(index);
            }
            // console.log(position);
            Move(obj, position);

            timer(obj, position);
        }

    }
    timer(oUl,position);
}
function timer(obj, pos) {
    // console.log(pos);
    clearInterval(obj.time);
    position = pos;
    obj.time = setInterval(function () {
        position += -520;
        // console.log(position);
        index  = (index++ == 4 )? 0 : index;
        if (position == -3120) {

            obj.style.left = '0px';
            position = -520;
            // index = 0;
        }

        Move(obj, position);

        // console.log('run');
    }, 3000)
}
function changeIndex(_index){
    // alert(_index);
    for(var i =0 ; i < littleCircle.length; i ++ ){
        littleCircle[i].className =  '';
    }
    littleCircle[_index].className = 'active';
}
