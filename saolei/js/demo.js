//点击开始游戏 -》动态生成100个小格--》100div
//leftClick 没有雷 --》显示数字(代表以当前小格为中心周围8个格的雷数) 扩散(当前周围八个格没有雷);
//           有雷 --》gameOver
//rightClick 没有标记并且没有数字。有标记 --》取消标记--》标记是否正确，10个都正确标记，提示成功
//已经出现数字 --》无效果
var startBtn = document.getElementById('startBtn'),
    box = document.getElementById('box'),
    flagBox = document.getElementById('flagBox'),
    alertBox = document.getElementById('alertBox'),
    alertImg = document.getElementById('alertImg'),
    bombNums, bombFlag,
    bombTemp = [],
    closeBtn = document.getElementById('closeBtn'),
    score = document.getElementById('score'),
    startgameBool = true;

bindEvent();
function bindEvent() {

    startBtn.onclick = function (){
        if (startgameBool) {
            startgameBool = false;
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();

        }
    }

    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        console.log(e);
        var event = e.target;
        console.log(event);
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    }
    closeBtn.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
        startgameBool = true;
    }
}

function init() {
    bombNums = 10;
    bombFlag = 10;
    score.innerHTML = bombFlag;

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            bombTemp.push({ bomb: 0 })
        }
    }
    block = document.getElementsByClassName('block');

    while (bombNums) {
        var bombIndex = Math.floor(Math.random() * 100);
        if (bombTemp[bombIndex].bomb === 0) {
            bombTemp[bombIndex].bomb = 1;
            block[bombIndex].classList.add('lei');
            bombNums--;
        }

    }



}
function leftClick(dom) {
    // console.log(dom);
    if(dom.classList.contains('flag')){
        return ;
    }
    console.log('left');
    var lei = document.getElementsByClassName('lei');
    if (dom && dom.classList.contains('lei')) { // 不要dom行不行
        console.log('gameover');
        for (var i = 0; i < lei.length; i++) {
            lei[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("./img/over.jpg")';
        }, 800);
    } else {

        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        console.log(posX);
        var posY = posArr && +posArr[1];
        console.log(posY);
        dom && dom.classList.add('num')
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                console.log(aroundBox);
                if (aroundBox && aroundBox.classList.contains('lei')) {
                    n++;
                }
            }
        }
        console.log(dom);
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }

                    }
                }
            }
        }
    }
}

function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('lei') && dom.classList.contains('flag')) {
        bombFlag--;
    }
    if (dom.classList.contains('lei') && !dom.classList.contains('flag')) {
        bombFlag++;
    }
    score.innerHTML = bombFlag;
    if (bombFlag == 0) {
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("./img/success.png")'
    }
}



