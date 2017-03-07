$(function(){
	//第一屏
//	$(".f_hd").animate({"left":"200px"},500);
	$(".linebox").toggle(function(){
		$(".box").slideDown(500);
		$(".line1").css("opacity",0);
		$(".line2").css("transform","rotate(45deg)");
		$(".line3").css("transform","rotate(-45deg)")
			.css("margin-top","-9px");
	},function(){
		$(".box").slideUp(500);
		$(".line1").css("opacity",1);
		$(".line2").css("transform","rotate(0deg)");
		$(".line3").css("transform","rotate(0deg)")
			.css("margin-top","0");
	});
	
	//第二屏
	//tab
	$("#tab li").mouseover(function(){
		$("#tab li.currentTab").removeClass("currentTab");
		$(this).addClass("currentTab");
		var showIndex=$(this).index();	//获取被点击li的索引
		$("#content li").hide();
		$("#content li:eq("+showIndex+")").show();
	});
	//三级联动
	var pro=$("#province");
	var city=$("#city");
	var country=$("#country");
	var currentCity;
	var data={
		"East":{
			"e1":["e11","e12","e13"],
			"e2":["e21","e22","e23"],
			"e3":["e31","e32","e33"]
		},
		"West":{
			"w1":["w11","w12","w13"],
			"w2":["w21","w22","w23"],
			"w3":["w31","w32","w33"]
		},
		"South":{
			"s1":["s11","s12","s13"],
			"s2":["s21","s22","s23"],
			"s3":["s31","s32","s33"]
		},
		"North":{
			"n1":["n11","n12","n13"],
			"n2":["n21","n22","n23"],
			"n3":["n31","n32","n33"]
		}
	};
	$.each(data,function(key,value){
		pro.append("<option>"+key+"</option>");
	});
	pro.change(function(){
		city.html("<option>--请选择--</option>");
        country.html("<option>--请选择--</option>");
        $.each(data, function(key,value){
        	if(pro.val()==key){
        		$.each(value,function(key2,value2){
        			city.append("<option>"+key2+"</option>");
        		});
        		currentCity=value;
        	}
        });
	});
	city.change(function(){
		country.html("<option>--请选择--</option>");
		$.each(currentCity, function(key,value){
			if(city.val()==key){
				$.each(value, function(kay2,value2){
					country.append("<option>" + value2 + "</option>");
				});
			}
		});
	});
	
	//第三屏
	$("#btn").toggle(function(){
		$("#moveBox").animate({"left":"236px"},300);
	},function(){	
		$("#moveBox").animate({"left":"351px"},300);
	},function(){
		$("#moveBox").animate({"left":"460px"},300);
	},function(){
		$("#moveBox").animate({"left":"568px"},300);
	},function(){
		$("#moveBox").animate({"left":"680px"},300);
	});
	
});