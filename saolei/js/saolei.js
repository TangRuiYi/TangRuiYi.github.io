//点击开始游戏--》 动态生成100个小格--》100 div
//leftClick   没有雷   --》 显示数字（代表以当前小格为中心，周围8个格的雷数)  扩散(当前在周围八个格没有雷)
//              有雷   --》gameOver
//rightClick  没有标记并且没有数字  --》 进行标记       有标记  --》取消标记  --》标记是否正确，10个都正确标记，提示成功
//已经出现数字 --》无效果

var btn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var close = document.getElementById('close');
var score = document.getElementById('score');
var bombNum;
var bombOver = 10;
var bombTemp = [];
var litte_blocks;
var stop = false;
var islei,frameId;
bindEvent();
function bindEvent() {
    btn.onclick = function () {
        box.style.display = 'block';
        flagBox.style.display = 'block';
        if (stop === false) {
            init();
        }
    }
    box.oncontextmenu = function (e) {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target || window.srcElement;
        if (e.which === 1) {
            leftClick(event);
        } else if (e.which === 3) {
            rightClick(event);
        }
    }
    close.onclick = function () {
        box.style.display = 'none';
        flagBox.style.display = 'none';
        alertBox.style.display = 'none';
        box.innerHTML = '';
        stop = false;
    }
}
function init() {
    bombNum = 10;
    score.innerText = bombNum;
    for (var i = 0; i < 10; i++)
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('little-block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            bombTemp.push({ mine: 0 });
        }
    litte_blocks = document.getElementsByClassName('little-block');
    while (bombNum > 0) {
        var randomNum = Math.floor(Math.random() * 100);
        if(!( litte_blocks[randomNum].classList.contains('islei'))){
            console.log(randomNum);
            litte_blocks[randomNum].classList.add('islei');
            bombTemp[randomNum].mine = 0;
            bombNum--;
        }


    }
    stop = true;
    time();
}
function leftClick(dom) {
    islei = document.getElementsByClassName('islei');
    if (dom && dom.classList.contains('islei')) {
        for (var i = 0; i < 10; i++) {
            if (islei[i].classList.contains('bomb')) {
                return;
            }
            islei[i].classList.add('bomb');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = "url('./img/over.jpg')";
        }, 300);
        cancelAnimationFrame(frameId);
    } else {
        var n = 0;
        var arr = dom && dom.getAttribute('id').split('-');
        var temp1 = arr && +arr[0];
        var temp2 = arr && +arr[1];
  
        for (var i = temp1 - 1; i <= temp1 + 1; i++)
            for (var j = temp2 - 1; j <= temp2 + 1; j++) {
                var around_block = document.getElementById(i + '-' + j);
                if (around_block && around_block.classList.contains('islei')) {
                    n++;
                }
            }
        dom && (dom.innerHTML = n);
        dom && dom.classList.add('num')
        if (n === 0) {
            for (var i = temp1 - 1; i <= temp1 + 1; i++) {
                for (var j = temp2 - 1; j <= temp2 + 1; j++) {
                    var near_block = document.getElementById(i + '-' + j);
                    if (near_block && near_block.length!=0) {
                        if (!near_block.classList.contains('checked')) {
                            near_block.classList.add('checked');
                            leftClick(near_block);
                        }
                    }
                }
            }

        }

    }
}
function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('islei') && dom.classList.contains('flag')){
        bombOver--;
    }
    if(dom.classList.contains('islei') && !dom.classList.contains('flag')){
        bombOver++;
    }
    score.innerText = bombOver;
    if(bombOver == 0){
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("./img/success.png")';
        cancelAnimationFrame(frameId);
    }
}

function time(){

    var timeObject = new Date(),
        startTime  = timeObject.getTime(),
        endTime,timeLength,sec,min,timeStr,
        time = document.getElementsByClassName('time')[0];

    function frame(){
        endTime = new Date().getTime();
        console.log(endTime);
        timeLength = endTime - startTime;
        sec = Math.floor(timeLength / 1000) % 60;
        min = Math.floor(timeLength / 1000 / 60);
        // console.log(endTime);
        // cancelAnimationFrame(frameId);
        if(sec < 10){
            sec =  '0' + sec;
        }
        if(min < 10){
            min =  '0' + min;
        }
        timeStr = min + ':' + sec ;
        console.log(timeStr);
        time.innerText = timeStr;
        frameId = requestAnimationFrame(frame);
    }
    frame();
}

function prompt(){

}

