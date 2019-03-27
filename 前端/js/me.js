//登录验证界面
function checklogin() {

	$.ajaxSetup({
		async: false
	});
	var showError = document.getElementById("showError");
	var account = document.getElementById("account").value;
	var password = document.getElementById("password").value;
	$.post("http://39.96.43.6:8080/practice_system/login", {

		account: account,
		password: password

	}, function(data, status) {
		var cog = data;
		if(cog == 1) {
			var accounts = account;
			window.location.href = "index.html?account=" + accounts;

		} else if(cog == 2) {
			showError.innerHTML = "密码错误";
		} else {
			showError.innerHTML = "账号不存在";
		}

	});
}
//物品浏览界面
function gets(content, kind, num) {

	$.ajaxSetup({
		async: true
	});
	var kind = kind;
	var show = document.getElementById("show");
	$.post("http://39.96.43.6:8080/practice_system/products", {

		kind: kind,
		num: num

	}, function(Result) {
		var json = eval(Result);
		var con = "";
		$.each(json, function(index, item) {
			var s1 = json[index].gname;
			var s2 = json[index].gmoney;
			var s3 = json[index].gid;
			var s4 = json[index].gpicture;
			var s5 = imgto(s4);
			//			con += "<td >" + s1 + "</p>" + s2 + "</td>";
			//			con += "<a onclick='" + "onsingle(" + s3 + ")'" +">" + s1 + "</a>" + "..." + s2 + "</br>";

			con += "<div class=" + "scan" + ">" +
				"<img onclick='" + "onsingle(" + s3 + ")'" + "src=" + s5 + " />" +
				"<div class=" + "women" + ">" +
				"<h6><a onclick='" + "onsingle(" + s3 + ")'>" + s1 + "</a></h6>" +

				"<p ><em>" + "￥" + s2 + "</em></p>" + 
				"<button onclick='" + "onsingle(" + s3 + ")'>" + "即刻订购</button>" +
				"</div>" +
				"</div>"

			content.innerHTML = con;
			//			alert(index)
		});

	});
}
//传值到单品页面
function onsingle(gid) {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);

		window.location.href = "single.html?account=" + account + "&gid=" + gid;

	} else {

		alert("您还没有登录哦！");
	}
}
//查询个人单个信息
function queryuser(type, account) {

	var results;

	$.ajaxSetup({
		async: false
	});

	$.post("http://39.96.43.6:8080/practice_system/query", {

		account: account

	}, function(Result) {
		var json = eval(Result);

		$.each(json, function(index, item) {

			switch(type) {
				case 1:
					results = json[index].login_id;
					break;
				case 2:
					results = json[index].login_password;
					break;
				case 3:
					results = json[index].client_name;
					break;
				case 4:
					results = json[index].client_rename;
					break;
				case 5:
					results = json[index].client_age;
					break;
				case 6:
					results = json[index].client_sex;
					break;
				case 7:
					results = json[index].client_money;
					break;
				case 8:
					results = json[index].client_tel;
					break;
				case 9:
					results = json[index].client_address;
					break;
				default:
					results = json[index].rights;
					break;
			}
		});
	});
	return results;
}
//更新左上角信息
function reset() {
	var result;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		result = url.substr(url.indexOf("=") + 1);
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(reg1.test(result)){
			
			var logint = document.getElementById("login-left");
		logint.parentNode.removeChild(logint);
		var name = queryuser(4, result);
		document.getElementById("login-right").innerHTML = "欢迎您," + name;
		}
		

	}
	return result;
}

function resetpc() {

	var result;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		result = url.substr(url.indexOf("=") + 1);
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(reg1.test(result)){
			
			var logint = document.getElementById("login-left");
		logint.parentNode.removeChild(logint);
		var name = queryuser(4, result);
		document.getElementById("login-right").innerHTML = "欢迎您," + name;
		}
		
		gets(content1, '上衣', 1);
		
		
	}
	
	return result;
}
//转换页面时传递信息，单值
function skip(name) {

	var result;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		result = url.substr(url.indexOf("=") + 1);
	}
	var reg1 = /^1(3|4|5|7|8)\d{9}$/;
	if(name == "center" || name == "cart" || name == "setting"){
		
		if(!reg1.test(result)){
			
			alert("您还没有登录噢！");
		}else{
			
			window.location.href = name + ".html?account=" + result;
		}
		
	}else{
		
		window.location.href = name + ".html?account=" + result;
	}
	
}

//单品页面跳转到其他页面的时候，应该减少一个传值
function skips(name) {

	var url = window.location.search;
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		var value = new Array(strs.length);
		for(i = 0; i < strs.length; i++) {

			value[i] = unescape(strs[i].split("=")[1]);
		}
		window.location.href = name + ".html?account=" + value[0];

	}
}

//点击个人中心直接加载，查询信息
function resetce() {
	var result;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		result = url.substr(url.indexOf("=") + 1);
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(reg1.test(result)){
			var logint = document.getElementById("login-left");
		logint.parentNode.removeChild(logint);
		var name = queryuser(4, result);
		document.getElementById("login-right").innerHTML = "欢迎您," + name;
		var client_name = queryuser(3, result);
		document.getElementById("client_name").value = client_name;
		var client_age = queryuser(5, result);
		document.getElementById("result").value = client_age;
		var client_sex = queryuser(6, result);
		if(client_sex == "男") {
			document.getElementById("male").checked = "checked";
		} else {
			document.getElementById("female").checked = "checked";
		}
		var client_tel = queryuser(8, result);
		document.getElementById("client_tel").value = client_tel;
		var client_address = queryuser(9, result);
		document.getElementById("cityResult3").value = client_address;
		var client_id = queryuser(1, result);
		document.getElementById("client_id").value = client_id;
		var client_rename = queryuser(4, result);
		document.getElementById("client_rename").value = client_rename;
		var rights = queryuser(10, result);
		document.getElementById("rights").value = rights;
		document.getElementById("client_name-2").value = client_name;
		document.getElementById("client_age").value = client_age;
		document.getElementById("client_sex").value = client_sex;
		document.getElementById("client_tel-2").value = client_tel;
		var client_money = queryuser(7, result);
		document.getElementById("client_money").value = client_money;
		document.getElementById("client_address-2").value = client_address;
		}
	}

}
//设置信息展现
function resetse() {
	var result;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		result = url.substr(url.indexOf("=") + 1);
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(reg1.test(result)){
			
			var client_rename = queryuser(4, result);
		document.getElementById("rename").innerHTML = client_rename;
		var login_id = queryuser(1, result);
		document.getElementById("login_idS").innerHTML = "账号:" + login_id;
		var client_name = queryuser(3, result);
		document.getElementById("client_name").innerHTML = client_name;
		document.getElementById("client_rename_3").innerHTML = client_rename;
		var client_tel = queryuser(8, result);
		document.getElementById("client_tel_3").innerHTML = client_tel;
		}
	}
	return result;
}

//查询单品页面
function resetsg() {

	var url = window.location.search;
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		var key = new Array(strs.length);
		var value = new Array(strs.length);
		for(i = 0; i < strs.length; i++) {
			key[i] = strs[i].split("=")[0]
			value[i] = unescape(strs[i].split("=")[1]);
		}
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(reg1.test(value[0])){
			
			var logint = document.getElementById("login-left");
		logint.parentNode.removeChild(logint);
		var name = queryuser(4, value[0]);
		document.getElementById("login-right").innerHTML = "欢迎您," + name;
		}
		
		var g_id = value[1];
		$.ajaxSetup({
			async: false
		});
		var g_money = document.getElementById("g_money");
		var g_name = document.getElementById("g_name");
		var g_descript = document.getElementById("g_descript");
		var g_picture = document.getElementById("g_picture");
		$.post("http://39.96.43.6:8080/practice_system/querygbyid", {

			g_id: g_id
		}, function(Result) {

			var json = eval(Result);
			var con = "";
			$.each(json, function(index, item) {
				var s1 = json[index].gname;
				var s2 = json[index].gmoney;
				var s3 = json[index].descript;
				var s4 = json[index].gpicture;
				var s5 = imgto(s4);
				g_money.innerHTML = s2;
				g_name.innerHTML = s1;
				g_descript.innerHTML = s3;
				g_picture.innerHTML = "<img src=" + s5 + " />"
			});
		});
		singleImg(g_id);
		singleReview(g_id);
	}

}
//查询商品单品图片描述
function singleImg(g_id) {

	$.ajaxSetup({
		async: false
	});
	$.post("http://39.96.43.6:8080/practice_system/querygpic", {

		g_id: g_id
	}, function(Result) {
		var single_img = document.getElementById("single-img");
		var json = eval(Result);
		var con = "";
		$.each(json, function(index, item) {
			var s1 = json[index].ppicture;
			var s2 = imgto(s1);
			single_img.innerHTML += "<img src=" + s2 + " />"
		});
	});
}

//查询商品单品评论
function singleReview(g_id) {

	$.ajaxSetup({
		async: false
	});
	$.post("http://39.96.43.6:8080/practice_system/querygrev", {

		g_id: g_id
	}, function(Result) {
		var content2 = document.getElementById("content2");
		var json = eval(Result);
		var con = "";
		$.each(json, function(index, item) {
			var s1 = json[index].login_id;
			var s2 = json[index].client_rename;
			var s3 = json[index].reviews;
			content2.innerHTML += "<span>" + s1 + "</span>" +
				"<span>" + s2 + "</span>" +
				"<div style=" + "'height: 100px; border:thin 1px #000000;'" + ">" +
				"<h2>" + s3 + "</h2>" +
				"</div>"
		});
	});

}

//更新用户信息
function updateUser(type, value) {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);

		$.ajaxSetup({
			async: false
		});

		$.post("http://39.96.43.6:8080/practice_system/updateUser", {

			account: account,
			type: type,
			value: value

		});

	}
}

var showError = document.getElementById("showError");

function setError(str) {

	showError.innerHTML = str;
	showError.style.color = "red";
}
//更改地址
function upaddress() {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);

		var address = document.getElementById("cityResult2").value;
		if(address == null || address == "") {

			setError("地址不能为空");
		} else {

			updateUser('client_address', address);
		}

		window.location.href = "center.html?account=" + account;

	}
}
//修改密码
function uppassword() {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);
		var passwords = queryuser(2, account);
		var old_password = document.getElementById("old_password").value;
		var new_password = document.getElementById("new_password").value;
		var new_password_1 = document.getElementById("new_password_1").value;
		if(old_password != passwords) {

			showError_1.innerHTML = "原始密码不正确";

		} else if(new_password == null || new_password == "") {

			showError_1.innerHTML = "新密码不能为空";

		} else if(new_password != new_password_1) {

			showError_1.innerHTML = "两次密码不一致";

		} else {

			updateUser('login_password', new_password);
			window.location.href = "login.html";

		}
	}
}
//账户充值
function upmoney() {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);
		var reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
		var old_money = queryuser(7, account);
		var new_money = document.getElementById("new_money").value;
		if(new_money == null || new_money == "") {

			showError_2.innerHTML = "充值金额不能为空";

		} else if(!reg.test(new_money)) {

			showError_2.innerHTML = "充值金额格式不对";

		} else {

			var money = parseFloat(old_money) + parseFloat(new_money);
			updateUser('client_money', money);
			window.location.href = "center.html?account=" + account;
		}

	}
}

//完善信息
function upinfo() {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);
		var client_name = document.getElementById("client_name").value;
		var client_age = document.getElementById("result").value;
		var client_sex = "";
		var radio = document.getElementsByName("client_sex");
		for(var i = 0; i < radio.length; i++) {

			if(radio[i].checked == true) {

				client_sex = radio[i].value;
				break;
			}
		}

		var client_tel = document.getElementById("client_tel").value;
		var client_address = document.getElementById("cityResult3").value;
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;

		if(client_name == null || client_name == "") {

			showError_3.innerHTML = "真实姓名不能为空";

		} else if(client_age == null || client_age == "") {

			showError_3.innerHTML = "出生日期不能为空";

		} else if(client_tel == null || client_tel == "") {

			showError_3.innerHTML = "联系方式不能为空";

		} else if(client_address == null || client_address == "") {

			showError_3.innerHTML = "用户地址不能为空";

		} else if(!reg1.test(client_tel)) {

			showError_3.innerHTML = "联系方式格式不正确";

		} else {

			updateUser("client_name", client_name);
			updateUser('client_age', client_age);
			updateUser('client_sex', client_sex);
			updateUser('client_tel', client_tel);
			updateUser('client_address', client_address);
			window.location.href = "center.html?account=" + account;
		}
	}
}
//查询订单
function queryOrder() {

	var order = document.getElementById("order");
	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);

		$.ajaxSetup({
			async: true
		});
		$.post("http://39.96.43.6:8080/practice_system/Order", {

			account: account

		}, function(Result) {
			var json = eval(Result);
			var con = "";
			$.each(json, function(index, item) {
				var s1 = json[index].dd_money;
				var s2 = json[index].gname;
				var s4 = json[index].count;
				var s5 = json[index].gpicture;
				var s6 = imgto(s5);
				//			con += "<div>" +
				//				"<img src='" + s6 + "' />" +
				//				"<h4>商品名称:" + s2 + "</h4>" +
				//				"<span>购买数量:" + s4 + "</span>" + 
				//				"<span>总价:" + s1 + "</span>" +
				//				"</div>";

				con += "<table class='" + "order-content'" + ">" +
					"<tr>" +
					"<td colspan='" + 3 + "'" + "><img src='" + s6 + "'/></td>" +
					"<td>" +
					"<div class='" + "order-content-1'" + ">" +
					"<h4>商品名称:</h4><h4>" + s2 + "</h4>" +
					"</div>" +
					"<div class='" + "order-content-2'" + ">" +
					"<span>购买数量:" + s4 + "</span>" +
					"<span>总价:" + s1 + "</span>" +
					"</div>" +
					"</td>" +
					"</tr>" +
					"</table>"
			});

			order.innerHTML = con;
		});

	}
}
//注册检验
function checkreg() {

	var login_id = document.getElementById("account").value;
	var client_rename = document.getElementById("email").value;
	var login_password = document.getElementById("password").value;
	var re_password = document.getElementById("password_confirm").value;

	var reg1 = /^1(3|4|5|7|8)\d{9}$/;
	var reg3 = /^\w{1,16}$/;

	if(login_id == null || login_id == "") {

		showError_4.innerHTML = "账号不能为空";

	} else if(client_rename == null || client_rename == "") {

		showError_4.innerHTML = "昵称不能为空";

	} else if(login_password == null || login_password == "") {

		showError_4.innerHTML = "密码不能为空";

	} else if(re_password != login_password) {

		showError_4.innerHTML = "两次密码不一致";

	} else if(!reg1.test(login_id)) {

		showError_4.innerHTML = "账号格式不正确";

	} else if(!reg3.test(client_rename)) {

		showError_4.innerHTML = "昵称格式不正确";

	} else {

		$.ajaxSetup({
			async: false
		});
		$.post("http://39.96.43.6:8080/practice_system/reg", {

			login_id: login_id,
			client_rename: client_rename,
			login_password: login_password

		}, function(data, status) {
			var cog = data;
			if(cog == 1) {

				showError_4.innerHTML = "账号已存在";

			} else {

				showError_4.innerHTML = "<a href=" + "login.html" + " style=" + "color: #007AFF;" + ">注册成功，快去登录吧！</a>"
			}

		});
	}
}
/*购物系统*/

//将单品加入购物车

function addcart() {

	var url = window.location.search;
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		var value = new Array(strs.length);
		for(i = 0; i < strs.length; i++) {

			value[i] = unescape(strs[i].split("=")[1]);
		}
		var account = value[0];
		var gid = value[1];
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(!reg1.test(account)) {

			alert("您还没有登录噢！");
		} else {

			var gnumber = document.getElementById("g_numbers").value;
			$.ajaxSetup({
				async: false
			});
			$.post("http://39.96.43.6:8080/practice_system/addCart", {

				account: account,
				gid: gid,
				gnumber: gnumber
			});
			alert("已加入购物车，快去下单吧！")

		}

	}
}

//购物车页面查询
function resetca() {

	var account;
	var url = window.location.search; //获取url中"?"符后的字串  
	if(url.indexOf("?") != -1) {
		account = url.substr(url.indexOf("=") + 1);
		var reg1 = /^1(3|4|5|7|8)\d{9}$/;
		if(reg1.test(account)){
			
			var logint = document.getElementById("login-left");
		logint.parentNode.removeChild(logint);
		var name = queryuser(4, account);
		document.getElementById("login-right").innerHTML = "欢迎您," + name;
		var concar = document.getElementById("concar");
		$.ajaxSetup({
			async: false
		});
		$.post("http://39.96.43.6:8080/practice_system/Cart", {

			account: account

		}, function(Result) {
			var json = eval(Result);
			var con = "";
			var i = 1;
			$.each(json, function(index, item) {

				var s1 = json[index].g_number;
				var s6 = json[index].float_number;
				var s2 = json[index].gmoney;
				var s3 = json[index].gkinds;
				var s4 = json[index].gname;
				var s5 = parseFloat(s1) * parseFloat(s2);
				var s7 = json[index].gid;
				var s8 = json[index].gpicture;
				var s9 = imgto(s8);
				con += "<input type=" + "'hidden'" + " id='" + "gid" + i + "' value='" + s7 + "' />" +
					"<div class = 'cart'>" +
					"<img id=" + "gpicture" + i + " src='" + s9 + "' />" +
					"<h5 id=" + "gname" + i + ">" + s4 + "</h5>" + "<br />" +
					"&nbsp;种类:" + "<span id=" + "gkind" + i + ">" + s3 + "</span>" +
					"&nbsp;数量:" + "<span id=" + "gnumber" + i + ">" + s1 + "</span>" +
					"&nbsp;总价格:" + "<span id=" + "gmoney" + i + ">" + s5 + "</span>" +
					"<button id=" + "c_id" + i + " onclick=" + "'" + "deletcar(" + i + ")" + "'" + " value=" + s6 + ">删除</button>" +
					"</div>"
				i++;
			});

			concar.innerHTML = con;
			document.getElementById("g_count").value = i;
		});
		}
	}
}

//购物车物品删除

function deletcar(count) {

	var c_id = "c_id" + count;
	if(confirm("确定要删除吗？")) {

		var float_number = document.getElementById(c_id).value;
		$.ajaxSetup({

			async: false
		});
		$.post("http://39.96.43.6:8080/practice_system/deletcart", {

			float_number: float_number
		});

		var url = window.location.search;

		if(url.indexOf("?") != -1) {

			var account = url.substr(url.indexOf("=") + 1);

			window.location.href = "cart.html?account=" + account;
		}

	} else {

		alert("取消")
	}

}
//直接删除
function delcar(count) {

	var c_id = "c_id" + count;

	var float_number = document.getElementById(c_id).value;
	$.ajaxSetup({

		async: false
	});
	$.post("http://39.96.43.6:8080/practice_system/deletcart", {

		float_number: float_number
	});

}

//购物车提交

function buycar() {

	var g_count = document.getElementById("g_count").value;

	var url = window.location.search;

	var account;

	if(url.indexOf("?") != -1) {

		account = url.substr(url.indexOf("=") + 1);

		var client_money = queryuser(7, account);

		var now_money = 0;

		for(var i = 1; i < g_count; i++) {

			var gmoney = "gmoney" + i;
			var money = document.getElementById(gmoney).innerHTML;
			now_money = parseFloat(now_money) + parseFloat(money);
		}

		if(client_money < now_money) {

			if(confirm("您的金额不足，快去充值吧！")) {

				window.location.href = "center.html?account=" + account;
			}
		} else {

			var newmoney = parseFloat(client_money) - parseFloat(now_money);
			updateUser('client_money', newmoney);
			var order_id;

			$.ajaxSetup({

				asnyc: false
			});
			$.post("http://39.96.43.6:8080/practice_system/insertOrder", {

				account: account,
				ddmoney: now_money

			}, function(Result) {
				var json = eval(Result);
				$.each(json, function(index, item) {

					order_id = json[index].dd_id

				});

			});

			for(var i = 1; i < g_count; i++) {

				var gidc = "gid" + i;
				var gid = document.getElementById(gidc).value;
				var countc = "gnumber" + i;
				var count = document.getElementById(countc).innerHTML;
				var gnamec = "gname" + i;
				var gname = document.getElementById(gnamec).innerHTML;
				var gpicturec = "gpicture" + i;
				var gpictures = document.getElementById(gpicturec).src;
				var gpicture = toimg(gpictures);

				$.post("http://39.96.43.6:8080/practice_system/insertconn", {

					gid: gid,
					dd_id: order_id,
					count: count,
					gname: gname,
					gpicture: gpicture

				});

			}
			for(var i = 1; i < g_count; i++) {

				delcar(i);
			}
			//		window.location.href = "cart.html?account=" + account;
			if(confirm("提交订单成功，看看你的订单吧!")) {

				window.location.href = "center.html?account=" + account;

			} else {

				window.location.href = "cart.html?account=" + account;
			}
		}
	}
}

//图片格式转换
function imgto(strln) {

	var str = strln.split("&");
	var result = str[str.length - 1];
	result = "http://39.96.43.6/shoppingimges/" + result;
	return result;
}
//图片转回格式
function toimg(strln) {

	var str = strln.split("/");
	var result = str[str.length - 1];
	result = "C:\\\\Users\\\\zxkj\\\\Pictures\\\\shoppingimges\\\\&" + result;
	return result;
}

//退出登录
function Signout(){
	
	window.location.href = "index.html"
}

