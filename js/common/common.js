/*封装的函数顺序排列   1、随机数字  2、获取数组中最大值  3、获取数组中最小值 4、获取数组中最大值的下标  5、获取数组中最小值的下标
6、冒泡排序 选择排序 快速排序 7、判断数组中是否存在某个值  返回值 true  false  8、数组去重（ES6新增有跟方便方法） 9、随机颜色1 rgba 随机颜色2#模式 10、获取当前时间 11、个位数前面补零成两位数  12、获取非行间样式兼容IE  13、样式显示隐藏 14、封装获取id 15、自定义的属性封装  两个值时获取 三个值时设置 16、距离页面的偏移量 17、事件监听的封装兼容IE 18、设置、获取、删除cookie 19、完美运动框架*/


/*
    随机数字  随机出现n-m 之间的数字 
    n:number  必填
    m:number  必填
*/

function numRandom(n, m) {
	if (m > n) {
		return parseInt(n + Math.random() * (m - n + 1));
	} else {
		return parseInt(m + Math.random() * (n - m + 1));
	}
}

/*获取数组中最大值*/
function arrMax(arr) {
	var max = arr[0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}
/*获取数组中最小值*/
function arrMin(arr) {
	var min = arr[0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < min) {
			min = arr[i];
		}
	}
	return min;
}
/*获取数组中最大值的下标*/
function arrMaxSub(arr) {
	var max = arr[0];
	var index = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
			index = i;
		}
	}
	return index;
}
/*获取数组中最小值的下标*/
function arrMinSub(arr) {
	var min = arr[0];
	var index = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < min) {
			min = arr[i];
			index = i;
		}
	}
	return index;
}
/*冒泡排序 从大到小*/
function mprank(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length - i - 1; j++) {
			var index = 0;
			if (arr[j + 1] > arr[j]) {
				index = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = index;
			}
		}
	}
	return arr;
}
/*选择排序 从大到小*/
function xzrank(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			var index = 0;
			if (arr[j] > arr[i]) {
				index = arr[i];
				arr[i] = arr[j];
				arr[j] = index;
			}
		}

	}
	return arr;
}
/*快速排序*/
function quickrank(arr) {
	/*用三目运算符取了中间下标，如果数组长度是奇数，就给这个奇数减1除2来作为中间下标这个更接近中间，
	老师是加了1以后再除的，但是对最后结果是没有影响的*/
	var midKey = arr.length % 2 == 0 ? arr.length / 2 : (arr.length - 1) / 2;
	var mid = arr[midKey];
	if (arr.length < 2) {
		return arr;
	}
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > mid && i != midKey) {
			left[left.length] = arr[i];
		}
		if (arr[i] <= mid && i != midKey) {
			right[right.length] = arr[i]
		}
	}
	return quickrank(left).concat(mid).concat(quickrank(right));
}
/*判断数组中是否存在某个值  返回值 true  false*/
function has(arr, n) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == n) {
			return true;
		}
	}

	return false;
}
/*数组去重*/
function norepeat(arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if (!has(newArr, arr[i])) {
			newArr.push(arr[i]);
		}
	}

	return newArr;
}
/*随机颜色1*/
function randomColor() {
	var r = numRandom(0, 255);
	var g = numRandom(0, 255);
	var b = numRandom(0, 255);

	return "rgb(" + r + "," + g + "," + b + ")";
}
/*随机颜色2*/
function randomColorTo() {
	var r = numRandom(0, 255);
	var g = numRandom(0, 255);
	var b = numRandom(0, 255);
	return "#" + bZero(r, g, b);

}

function bZero(R, G, B) {
	var r = R.toString(16).length < 2 ? "0" + R.toString(16) : R.toString(16);
	var g = G.toString(16).length < 2 ? "0" + G.toString(16) : G.toString(16);
	var b = B.toString(16).length < 2 ? "0" + B.toString(16) : B.toString(16);

	return "" + r + g + b;
}
/*获取当前时间*/
function getDate(d, sign) {
	sign = sign ? sign : "/";

	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();

	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();

	return year + sign + dZero(month) + sign + dZero(date) + " " + dZero(h) + ":" + dZero(m) + ":" + dZero(s);
}
/*个位数前面补零成两位数*/
function dZero(n) {
	n = n < 10 ? "0" + n : n;

	return n;
}
/*获取非行间样式兼容IE*/
function getStyle(ele, attr) {
	if (ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele, false)[attr];
	}
}

/*样式显示隐藏*/
function show(ele) {
	ele.style.display = "block";
}

function hide(ele) {
	ele.style.display = "none";
}

/*封装获取id*/
function $(ele) {
	return document.getElementById(ele);
}

/*自定义的属性封装  两个值时获取 三个值时设置*/

function custom() {
	if (arguments.length == 2) {
		return arguments[0].getAtrribute(arguments[1]);
	} else if (arguments.length == 3) {
		arguments[0].setAttribute(arguments[1], arguments[2]);
	} else {
		return;
	}
}

/*距离页面的偏移量*/
function offset(ele) {
	var obj = {}
	obj.l = ele.offsetLeft;
	obj.t = ele.offsetTop;

	while (ele.offsetParent) {
		ele = ele.offsetParent;

		obj.l += ele.offsetLeft;
		obj.t += ele.offsetTop;
	}

	return obj;
}

/*事件监听的封装兼容IE*/
function on(ele, eventName, callback, bool) {
	if (window.addEventListener) {
		ele.addEventListener(eventName, callback, bool ? true : false);
	} else {
		ele.attachEvent("on" + eventName, callback);
	}
}
/*设置cookie*/
function setCookie(key, val, expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);

	document.cookie = key + "=" + val + ";path=/;expires=" + d;
}
/*获取cookie*/
function getCookie(key) {
	var cookies = document.cookie;
	var arr = cookies.split("; ");
	for (var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if (newArr[0] == key) {
			return newArr[1];
		}
	}
}
/*删除cookie*/
function removeCookie(key) {
	setCookie(key, "", -1);
}

/*完美运动框架*/
//与老师封装的完美运动框架不同 我的封装传入的透明度的实参目标值为实际的值不用乘100
function getStyle(ele, attr) {
	if (ele.currentStyle) {
		return ele.currentStyle[attr]; //attr因为是一个变量，所以写在[]中
	} else {
		return getComputedStyle(ele, false)[attr];
	}
}

function move(ele, obj, callback) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function () {
		var bStop = true;
		for (var attr in obj) {
			var iTarget = obj[attr];
			if (attr == "opacity") iTarget *= 100;
			var cswz;
			if (attr == "opacity") {
				cswz = getStyle(ele, attr) * 100;
			} else {
				cswz = parseInt(getStyle(ele, attr));
			}

			var speed = (iTarget - cswz) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if (cswz != iTarget) {
				bStop = false;
			}

			if (attr == "opacity") {
				ele.style[attr] = (cswz + speed) / 100;
				//透明度兼容IE
				ele.style.filter = 'alpha(opacity:' + (cswz + speed) + ')';
			} else {
				ele.style[attr] = cswz + speed + "px";
			}
		}
		if (bStop) {
			clearInterval(ele.timer);
			callback && callback(); //这里用了&&的一个小技巧，callback不传入时是undefined，即&&左边是false，这样就不会再执行&&右边的代码了。
		}
	}, 30)
}