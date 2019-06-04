/*
axios({
    method:"get",
    data:{},
    url:"",

})
*/



function axios(options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var str = "";
        for (var key in options.data) {
            str += "&" + key + "=" + options.data[key];
        }
        if (options.method == "get") {
            var url = options.url + "?" + str.slice(1);
            xhr.open("get", url);
            xhr.send();
        } else {
            xhr.open("post", options.url);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(str.slice(1));
        }
        var iNow = new Date().getTime();
        xhr.onreadystatechange = function () {
            var d = new Date().getTime(); //这里有个过程  xhr.readyState 状态由0-4  因此下面判断不能加else；
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            if (d - iNow > 10000) {
                if (xhr.readyState != 4 || xhr.status != 200) {
                    var obj={state:xhr.readyState,
                            status:xhr.status}
                    reject(obj)
                }
            }
        }
    })
}