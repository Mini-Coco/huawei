$(function(){
	//回到顶部
	$("#hungBar-top").hide();
	$(window).scroll(function(){
		if($(window).scrollTop()>500){
			$("#hungBar-top").fadeIn(500);
		}else{
			$("#hungBar-top").fadeOut(500);
		}
	});
	
	$("#hungBar-top").click(function(){
		$("body").animate({"scroll-top":0},500);
	});
	
	/*------------------首页------------------*/
	//搜索框	聚焦/离焦
	$("#search-kw").focus(function(){
		$(".searchBar-key").hide();
	}).blur(function(){
		$(".searchBar-key").show();
	});
	//搜索
	$("#search-area .button").click(function(){
		var searchContent=$("#search-kw").val();
		$(".grid-items:contains("+searchContent+")").css("box-shadow","0 0 20px red inset");
	});
	
	//鼠标浮动  二维码切换
	$("#ec-erweima .ec-slider-nav span").mouseover(function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var showIndex=$(this).index();
		$("#ec-erweima .ec-slider-item").fadeOut();
		$("#ec-erweima .ec-slider-item:eq("+showIndex+")").fadeIn();
	});
	
	//9张轮播
	$(".hot-board .ec-slider-list li").fadeOut(0).eq(0).fadeIn(0);
	var i=0;
	function nineLunbo(){
        if((i+1)<$(".hot-board .ec-slider-list li").length){
            $(".hot-board .ec-slider-list li").eq(i).fadeOut(0).next("li").fadeIn(500);
            i++;
            $(".ec-slider-nav-1 span").eq(i).addClass("current");
            $(".ec-slider-nav-1 span").eq(i-1).removeClass("current");
        }
        else{
            $(".hot-board .ec-slider-list li").eq(i).fadeOut(0).siblings("li").eq(0).fadeIn(500);
            i=0;
            $(".ec-slider-nav-1 span").eq(i).addClass("current");
            $(".ec-slider-nav-1 span").eq(i-1).removeClass("current");
        }
    }
    var nine=setInterval(nineLunbo,5000);
    
    //鼠标浮动上去停止计时器
    $("#index_slider").hover(function(){
    	clearInterval(nine);
    },function(){
    	nine=setInterval(nineLunbo,5000);
    });
    
	//鼠标浮动  9张轮播切换
	$(".ec-slider-nav-1 span").mouseover(function(){
		i=$(this).index();
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var showIndex=$(this).index();
		$(".hot-board .ec-slider-list li").fadeOut();
		$(".hot-board .ec-slider-list li:eq("+showIndex+")").fadeIn(500);
	});
    
    //2张轮播
	$(".home-banner .ec-slider-list li").fadeOut(0).eq(0).fadeIn(0);
	var j=0;
	setInterval(function(){
        if((j+1)<$(".home-banner .ec-slider-list li").length){
            $(".home-banner .ec-slider-list li").eq(j).fadeOut(0).next("li").fadeIn(500);
            j++;
            $("#m-banner .ec-slider-nav span").eq(j).addClass("current");
            $("#m-banner .ec-slider-nav span").eq(j-1).removeClass("current");
        }
        else{
            $(".home-banner .ec-slider-list li").eq(j).fadeOut(0).siblings("li").eq(0).fadeIn(500);
            j=0;
            $("#m-banner .ec-slider-nav span").eq(j).addClass("current");
            $("#m-banner .ec-slider-nav span").eq(j-1).removeClass("current");
        }
    },5000);
    //鼠标浮动  2张轮播切换
	$(".home-banner .ec-slider-nav span").mouseover(function(){
		j=$(this).index();
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var showIndex=$(this).index();
		$(".home-banner .ec-slider-list li").fadeOut();
		$(".home-banner .ec-slider-list li:eq("+showIndex+")").fadeIn();
	});
	
	//添加购物车
	$(".grid-items").hover(function(){
		$(this).append("<span class='spanElem'>添加购物车</span>");
	},function(){
		$(".spanElem").remove();
	});
	
	var cartNum=[0,0,0,0];
	$(".grid-items").on("click","span.spanElem",function(){
		var name=$(this).parent();
		var index=parseInt($(name).attr("index"));
		cartNum[index]=1;
		alert("添加购物车成功！");
	});
	
	$("#header-toolbar-minicart-h").click(function(){
		sessionStorage.cartNum=cartNum;
		window.location.href="huawei-cart.html";
	});
	
});


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
function checkLogin(){
    var param="number";
    var username=getCookie(param);
    if(username && username.length > 0) {
        document.getElementsByClassName("s-login")[0].innerHTML
        ="<a href=''>"+username+"</a>"+" | "+"<a href='' onclick='exit()'>exit</a>";
        document.getElementById("cart_unlogin_info").getElementsByTagName("p")[0].innerHTML
        ="<a href=''>"+username+"</a>"+" | "+"<a href='' onclick='exit()'>exit</a>";
    }
    else{
        document.getElementsByClassName("s-login")[0].innerHTML
        ="<a href='login.html'>登录</a>&nbsp;<a href='register.html'>注册</a>";
        document.getElementById("cart_unlogin_info").getElementsByTagName("p")[0].innerHTML
        ="你好，请&nbsp;&nbsp;<a href='login.html'>登录</a> | <a href='register.html'>注册</a>";
    }
}
function exit(){
	var date=new Date();
	date.setTime(date.getTime()-3600);
	document.cookie="number=;expire="+date.toGMTString();
	document.cookie="password=;expire="+date.toGMTString();
	checkLogin();
}



