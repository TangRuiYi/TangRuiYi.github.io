
function ajax(method, callback,info,url) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Micorsoft.XMLHttp');
    }
    method = method.toUpperCase();
    if (method == 'POST') {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(info);
    } else if (method == 'GET') {
        console.log('hello world')
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method, url + '?' + info + '&timer=' + timer, true);
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        console.log(666);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }else{
                console.log('error');
            }
        }
    }

}
