//添加购物车
var data={
	name:["荣耀8","HUAWEI P9","荣耀畅玩5A","荣耀 NOTE 8"],
	src:["img/1478173617511.jpg","img/1478874041798.jpg","img/1476774468229.jpg","img/1478224689675.jpg"],
	price:[2299,3388,699,2499]
};

var cartNum=sessionStorage.cartNum;
cartNum=cartNum.split(",");
$.each(cartNum, function(index) {
	cartNum[index]=parseInt(cartNum[index]);
});

$(function(){
	$.each(cartNum, function(index) {
		if(cartNum[index]==0) {
			return true;
		}else{
			$("#cartContent").append("<tr class='box-"+index+"'></tr>");
		}
		$("#cart-empty-msg").hide();
		$("#cartContent>tr:last").append("<td class='tr-check'></td>").append("<td class='tr-pro'></td>").append("<td class='tr-price'></td>").append("<td class='tr-quantity'></td>").append("<td class='tr-subtotal'></td>").append("<td class='tr-operate'></td>");
		$("#cartContent>tr>td.tr-check:last").append("<input class='checkbox' type='checkbox' name='choose'>");
		$("#cartContent>tr>td.tr-pro:last").append("<div class='pro-area clearfix'><p class='p-img'><a><img src='"+data.src[index]+"'></a></p><p class='p-name'>"+data.name[index]+"</p></div>");
		$("#cartContent>tr>td.tr-price:last").append("<span>¥"+data.price[index]+"</span>");
		$("#cartContent>tr>td.tr-quantity:last").append("<div class='sc-stock-area'><div class='stock-area'><a class='icon-minus-3 vam' index='"+index+"' title='减'></a><input id='quantity-"+index+"' type='text' class='shop-quantity textbox vam shop1' value='1'><a class='icon-plus-3 vam' index='"+index+"' title='加'></a></div></div>");
		$("#cartContent>tr>td.tr-subtotal:last").append("<b>¥<span id='total-"+index+"' class='priTotal'>"+data.price[index]+"</span></b>");
		$("#cartContent>tr>td.tr-operate:last").append("<a href='javascript:;' class='icon-sc-del' title='删除'>删除</a>");
	});
	
	if($("#cartContent tr").length==0){
		$(".sc-list .sc-pro-list,.sc-list .hr-20,.sc-list #cart-total-area,.sc-list .hr-25,.sc-list .sc-action-area").hide();
		$("#cart-empty-msg").show();
	}
	
	//
	$("#cartContent").on("keyup","input.shop-quantity",function(){
		var inputElem=$(this).attr("id");
		inputElem=parseInt(inputElem.replace(/quantity-/,""));
		var reg=/^\d{1,10}$/;
		if(reg.test($(this).val())){
			$(this).css("border","1px solid #999");
			$(this).css("background-color","white");
			num=$(this).val();
			$("#box-"+index+" "+".priTotal").text(inputElem*num);
		}else if($(this).val()==""){
			$(this).val(1);
		}else{
			$(this).css("border","1px solid red");
			$(this).css("background-color","rgba(255,0,0,0.2)");
			$(this).val("NaN");
		}
	});
	
	$("#cartContent").on("click",".icon-plus-3",function(){
		var num=parseInt($("#quantity-"+$(this).attr("index")+"").val());
		var priceTotal=parseFloat($("#total-"+$(this).attr("index")+"").text());
		num+=1;
		$("#quantity-"+$(this).attr("index")+"").val(num);
		$("#total-"+$(this).attr("index")+"").text(data.price[parseInt($(this).attr("index"))]*num);
		$(".totalAll").text(parseInt($("#total-0").text())+parseInt($("#total-1").text()));
	});
	$("#cartContent").on("click",".icon-minus-3",function(){
		var num=parseInt($("#quantity-"+$(this).attr("index")+"").val());
		var priceTotal=parseFloat($("#total-"+$(this).attr("index")+"").text());
		if(num==1){
			return false;
		}
		num-=1;
		$("#quantity-"+$(this).attr("index")+"").val(num);
		$("#total-"+$(this).attr("index")+"").text(data.price[parseInt($(this).attr("index"))]*num);
		$(".totalAll").text(parseInt($("#total-0").text())+parseInt($("#total-1").text()));
	});

	
	//全选
	$("#checkAll-top,#checkAll").click(function(){
		$("[name=choose],[name=all]").attr("checked",this.checked);
	});
	//判断数量
	$("#order-pro .tr-check .checkbox").click(function(){
		var chooseNum=$("[name=choose]").length;
		var checkedNum=$("[name=choose]:checked").length;
		if(checkedNum<chooseNum){
			$("#checkAll-top,#checkAll").attr("checked",false);
		}else{
			$("#checkAll-top,#checkAll").attr("checked",true);
		}
	});
	//反选
	$("#checkReverse").click(function(){
		$("#order-pro .tr-check").find(":checkbox").each(function(){
			$(this).attr("checked",!$(this).attr("checked"));
		});
		var chooseNum=$("[name=choose]").length;
		var checkedNum=$("[name=choose]:checked").length;
		if(checkedNum<chooseNum){
			$("#checkAll-top,#checkAll").attr("checked",false);
		}else{
			$("#checkAll-top,#checkAll").attr("checked",true);
		}
	});
	//删除
//	$(".icon-sc-del").click(function(){
//		if($("#cartContent .tr-check:checked").length==0){
//			alert("清至少勾选一条记录。");
//			return;
//		}else{
//			
//		}
//	});
	$(".icon-sc-del").click(function(){
		if(confirm("您确定要删除么？")){
			$(this).parent().parent().remove();
		}else{
			return false;
		}
	});

});