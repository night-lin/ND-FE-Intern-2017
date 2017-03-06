window.onload = function() {
	/*1. JavaScript数据类型及语言基础*/
	console.log("1. JavaScript数据类型及语言基础");
	/*1.1实践判断各种数据类型的方法*/
	/*js六大数据类型：number、string、object、Boolean、null、undefined 可由typeof判断类型*/
	/*判断数组 方法1.通过instanceof和constroctur判断,存在跨页面问题:比如在一个页面中有一个子页面，在子页面声明array并赋值给
	父页面变量时，判断Array == object.constructur 返回的是false,因为array属于引用型数据，在传递过程中，仅仅是引用地址的传递，而每个页面array的原生对象引用的地址不一样
			   方法2.通过isArray判断，存在属性检测方式问题；
			   综合，采用如下方法
	*/
	console.log("1.1 数组和函数类型判断");
	var a  = [1,2,"22"];
	function isArray(arr){
		// return (a instanceof(Array));
		return Object.prototype.toString.call(arr) === '[object Array]';
	};
	console.log(isArray(a))
	/*判断函数 同上 */
	var b  = function(){

	};
	function isFunction(fn){
		// return (a instanceof(Array));
		return Object.prototype.toString.call(fn) === '[object Function]';
	};
	console.log(isFunction(b))

	/*1.2了解值类型和引用类型的区别，了解各种对象的读取、遍历方式*/
	/*值类型包括Undefined、Null、Boolean、Number和String
	值类型保存在栈，操作的就是实际对象本身；
	引用类型是保存在堆内存中的对象，通过地址进行访问，操作的也是对实际对象的引用
	在函数传参时，都是按值传递，即执行复制：值类型的复制就是复制一个数值，引用类型的复制复制的就是变量的地址
	举个例子:
	function setName(obj){
		obj.name = "2";		//obj复制了obj1指向的变量的地址，不是按引用传递
		obj = new Object();
		obj.name = "3";		//如果是按照引用传递，那么此时obj1指向的对象应该被销毁了
	};
	var obj1 = new Object();
	obj1.name ="1";
	setName(obj1);
	console.log(obj1);//2

	拷贝:
	值类型直接拷贝即可;
	引用类型使用for-in执行浅拷贝（循环复制所有属性，只拷贝第一层），
	利用递归判断某个属性则可以深度拷贝
	如下:
	*/
	console.log("1.2 深度拷贝");
	function cloneObject(src){
		var newObj = {};
		if(typeof(src) != 'object'){
			return src;
		}		 
		for(var attr in src){
			newObj[attr] = cloneObject(src[attr]);
		}
		return newObj;
	}

	var srcObj = {
		a: 1,
		b: {
			b1: ["hello", "hi"],
			b2: "JavaScript"
		}
	};
	var abObj = srcObj;
	var tarObj = cloneObject(srcObj);

	srcObj.a = 2;
	srcObj.b.b1[0] = "Hello";

	console.log(abObj.a);//2
	console.log(abObj.b.b1[0]);//Hello

	console.log(tarObj.a);      // 1
	console.log(tarObj.b.b1[0]);    // "hello"

	/*1.3学习数组、字符串、数字等相关方法*/
	/*
	数组的方法： 
	转换方法  toString();
	栈方法 push() pop();
	队列方法 shift() push() unshift()
	重排序方法 restore() sort()
	操作方法  concat() splice()
	位置方法 indexOf() lastIndexOf()
	迭代方法 every() fliter() forEach() map() some()
	缩小方法 reduce() 和reduceRight()

	字符串的方法:
	操作方法 concat() slice() substr() substring() 
	位置方法 indexOf() lastIndexOf()
	去除前后空格方法 trim()
	大小写转换方法 toLowerCase() toUpperCase()
	*/

	/*数组(元素为数字或者字符串)去重方法思路:
	1.循环遍历查找(效率低下)
	2.对象键值比比对，原理即哈希散列(速度快，但占用内存可能比较大)
	3.先排序后cmp比对（速度较快但要增加排序时间损耗，内存小但返回结果顺序也是排序后的顺序）
	根据要求写采用思路2 在这里要注意，由于比对的时候回采用toString方法，所以 a[1]和a["1"]会被当做同样的，所以要利用indexOf
	*/
	console.log("1.3.1数组去重");
	function uniqArray(arr) {
   		var resArr = [];
   		var tempObj = {};
		for (var i = 0; i <  arr.length;i++)
   		{
   			var val = arr[i];
   			var type = typeof(val); 
   			if(!tempObj[val]){
   				//若对象无该值属性，则增加对象中该值属性,且设置对应值为数据类型,并将该数组值放入结果数组
   				tempObj[val] = [type];
   				resArr.push(val);
   			}
   			else if(tempObj[val].indexOf(type)<0)
   			{
   				//在此处解决toString带来的问题
   				tempObj[val].push(type);
   				resArr.push(val);
   			}
   		}
   		console.log(tempObj)
   		return resArr; 
	}
	var a = [1, 3, 5, 7, 5, 3,'1'];
	var b = uniqArray(a);
	console.log(b); // [1, 3, 5, 7]

	/*字符串头尾进行空格去除·正则实现*/
	console.log("1.3.2 字符串头尾进行空格去除");
	function trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");  
	}
	var str = '   hi!  ';
	str = trim(str);
	console.log(str); // 'hi!'

	/*实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递。思路：由forEach函数进行改造*/ 
	console.log("1.3.3 遍历数组,针对数组中每一个元素执行fn函数");
	function each(item, fn) {
	    arr.forEach(fn);
	}
	// 使用示例
	var arr = ['java', 'c', 'php', 'html'];
	function output(item, index) {
	    console.log(index + ': ' + item)
	}
	each(arr, output);  // 0:java, 1:c, 2:php, 3:html


	/*获取一个对象里面第一层元素的数量，返回一个整数*/
	console.log("1.3.4 获取一个对象里面第一层元素的数量");
	function getObjectLength(obj) {
		var count= 0;
		for(var i in obj){
			 count++;
		}
		return count;
	}
	// 使用示例
	var obj = {
	    a: 1,
	    b: 2,
	    c: {
	        c1: 3,
	        c2: 4
	    }
	};
	console.log(getObjectLength(obj)); // 3

	/*正则表达式判断是否为邮箱地址,思路：数字或者字符或者下划线+@+数字或者字符或者下划线+ . +数字或者字符或者下划线*/
	console.log("1.3.5 邮箱验证");
	function isEmail(emailStr) {
	    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		return reg.test(emailStr); 
	}
	var str = 'wew32_-3t@hotmail.com';
	console.log(isEmail(str));
	/*正则表达式判断判断是否为手机号思路：1开头 11位*/
	console.log("1.3.6 手机号码验证");
	function isMobilePhone(phone) {
	    var reg = /^1\d{10}$/; 
		return reg.test(phone);
	}
	var str = '13912345618';
	console.log(isMobilePhone(str));



	/*2.DOM*/
	console.log("2.DOM");

	/*为element增加一个样式名为newClassName的新样式*/
	console.log("为element增加一个样式名为newClassName");
	var d1 = document.getElementById("d1");
	addClass(d1,'d2')
	addClass(d1,'d2')
	console.log(d1)
	// 为element增加一个样式名为newClassName的新样式
	function addClass(element, newClassName) {
		if (element.className.length == 0) {
			//若element没有class，则直接增加
			element.className = newClassName;
		}else {
			//若已有class，先判断是否已有newClassName，防止重复添加相同className
			if(element.className.indexOf(newClassName) < 0)
			element.className = element.className+' '+newClassName;
		}	
	}


	// 移除element中的样式oldClassName
	console.log("为element移除element中的样式oldClassName");
	removeClass(d1,'dd');
	console.log(d1)
	function removeClass(element, oldClassName) {
		//若未包含 oldClassName，直接返回
	    if (element.className.length == 0 ||element.className.indexOf(oldClassName) < 0)
	    {
	    	return false;
	    }
	    //若含有则使用正则表达式替换，要注意保留一个空格
	    else{
	    	var reg = new RegExp(' ' + oldClassName + ' ',"g");
	    	element.className = element.className.toString().replace(reg,' ');
	    }
	}
	

	/*判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值*/
	function isSiblingNode(element, siblingNode) {
	    // 获取所有兄弟节点
	    var siblings = element.parentNode.children;
	   // console.log(siblings)
	    for(var i = 0;i< siblings.length ;i++){
	    	if( siblings[i] === siblingNode)
	    	{
	    		return true;
	    	}	
	    }
	    return false;
	}
	var child1 = document.getElementById("child1");
	var child2 = document.getElementById("child2");
	console.log(isSiblingNode(child1,child2));

	/*获取element相对于浏览器窗口的位置，返回一个对象{x, y}*/
	function getPosition(element) {
	    var position  = {
	    	x:'',
	    	y:''
	    };
	    //绝对位置减去浏览器滚动条长度
	    var X = element.getBoundingClientRect().left+document.documentElement.scrollLeft;
	    console.log(X)
	    //绝对位置减去浏览器滚动条长度
	    var Y = element.getBoundingClientRect().top+document.documentElement.scrollTop;
	    console.log(Y)
	    position.x = X; 
	    position.y = Y;
	    return position; 
	}
	var p = getPosition(d1);
	console.log(p)


	/*模拟jq选择器*/
	function $(selector){
		//判断选择器类型
		if(selector[0]=='#'){
			var id = selector.slice(1);
			console.log(id)
		}
	}
	console.log($('#d1'));
	










	
	

}