//register
$(function(){
	//获取验证码
	$("#getValiCode").click(function(){
		//随机产生6位验证码
		var codeElem="";
		for(var i=0;i<6;i++){
			codeElem+=Math.floor(Math.random()*10);
		}
		document.cookie="code="+codeElem+";";
		$(this).val("60");
		countDown=setInterval(countdown,1000);
	});
	var i=59;
	function countdown(){
		$("#getValiCode").val(i--);
		if(i==-2){
			$("#getValiCode").val("获取验证码");
			clearInterval(countDown);
			var date=new Date();
			date.setTime(date.getTime()-3600);
			document.cookie="code="+date.toGMTString();
			//重置i，再次点击重新进行倒计时
			i=59;
		}
	}
});

function checkNum(num){
	var reg=/^1\d{10}$/;
	if(reg.test(num.value)==false){
		alert("手机号码格式不正确！");
		return false;
	}
	return true;
}
function checkCode(code){
	var code=document.querySelector("#authCode").value;
	if(code==getCookie("code")){
		return true;
	}else{
		alert("验证码错误！");
		return false;
	}
}
function checkPswd(pswd){
	var len=pswd.value.length;
	if(len<8||len>32){
		alert("密码格式不正确！");
		return false;
	}
	return true;
}
function checkPswd2(pswd2){
	var pswd=document.querySelector("#password");
	if(pswd.value!=pswd2.value){
		alert("两次密码不一致！");
		return false;
	}
	return true;
}
function register(){
	var num=document.querySelector("#username");
	var code=document.querySelector("#authCode");
	var pswd=document.querySelector("#password");
	var pswd2=document.querySelector("#password2");
	
	if(checkNum(num)==false){
		return false;
	}
	if(checkCode(code)==false){
		return false;
	}
	if(checkPswd(pswd)==false){
		return false;
	}
	if(checkPswd2(pswd2)==false){
		return false;
	}
	
	document.cookie="number="+num.value+";";
	document.cookie="password="+pswd.value+";";
	
	return true;
}

//login
function getCookie(cookieInfo){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		if(arr[0].trim()==cookieInfo)
       		return arr[1];
	}
	return "";
}
function login(){
	var nameElem=document.querySelector("#name");
	var pswdElem=document.querySelector("#pswd");
	var username=nameElem.value;
	var password=pswdElem.value;
	if(username==""||password==""){
		alert("用户名或密码不能为空！");
		return false;
	}else if(username==getCookie("number") && password==getCookie("password")){
		return true;
	}else{
		alert("用户名或密码错误！");
		return false;
	}
}

