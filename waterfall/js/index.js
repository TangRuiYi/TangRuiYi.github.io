(function () {
    var oLi = document.getElementsByTagName('li'),
        itemWidth = 200,
        page = 1,
        flag = false;
    function getData() {
        if(!flag){
            flag = true;
            ajax('GET', addDom, 'cpage=' + page, 'getPics.php');
            page++;
        }

    }
    getData();
    function addDom(data) {
        var dataList = JSON.parse(data);
        console.log(dataList);
        dataList.forEach(function (ele, index) {
            var oItem = document.createElement('div'),
                oImg = new Image(),
                oP = document.createElement('p'),
                minIndex = getMinList(oLi)
                oBox = document.createElement('div');
            console.log(minIndex);
            oItem.className = 'item';
            oBox.className  = 'box';

            oImg.width = itemWidth;
            oImg.height = ele.height / ele.width * itemWidth;

            oImg.src = ele.preview;
            oP.innerText = ele.title;

            oImg.onerror = function(){
                this.style


            }

            oBox.appendChild(oImg);
            oBox.appendChild(oP);
            oItem.appendChild(oBox);
            oLi[minIndex].appendChild(oItem);

        })
        flag = false;
    }
    function getMinList(dom) {
        var minHeight = dom[0].offsetHeight,
            index = 0;
        for (var i = 0; i < dom.length; i++) {
            var ele = dom[i].offsetHeight;
            if (minHeight > ele) {
                minHeight = ele;
                index = i;
            }
        }
        return index;

    }
    window.onscroll = function () {
        var minValue = oLi[getMinList(oLi)].offsetHeight,
            scrollHeight = document.documentElement.scrollTop || document.body.scrollTop,
            pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (minValue < scrollHeight + pageHeight) {
            getData();
        }
    }


})()
