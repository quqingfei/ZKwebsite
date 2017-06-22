$(function(){
	var total = $(".page").length;
	var index = 0;
	for(var i=0;i<total;i++){
		if(i==0)
			$("#pageBar_ul").html($("#pageBar_ul").html()+"<li class='bar_current'></li>");
		else
			$("#pageBar_ul").html($("#pageBar_ul").html()+"<li class='bar_normal'></li>");
	}
	$(".pageBox").mousewheel(function(event, delta){
		event.preventDefault();
		if(!playOver)return;
		if(delta==-1){
			if(index<total-1)index++;
		}else if(delta==1){
			if(index>0)index--;
		}else{
			return false;
		}
		goPage(index);
     });
	 //点击控制条跳转到指定页面
     $("#pageBar_ul li").click(function(){
     	goPage($("#pageBar_ul li").index(this));
     });
     
    $($(".title ul li a").get(1)).removeClass("title_buton").addClass("title_buton_hover"); 
    
    $(".input_text").focus(function(){
    	var self = $(this);
    	self.css("color","#ffffff");
    	self.css("border-color","#ffd600");
    	if(self.val()=="公司名称"||self.val()=="公司地址"||self.val()=="健身场地面积"||self.val()=="会员数量"||self.val()=="联 系 人"||self.val()=="联系电话")
    		self.val("");
    });
    $(".input_text").blur(function(){
    	var self = $(this);
    	self.css("border-color","#333333");
    	if(self.val().trim()==""){
    		self.css("color","#333");
    		if(self.attr("id")=="company")self.val("公司名称");
    		else if(self.attr("id")=="address")self.val("公司地址");
    		else if(self.attr("id")=="area")self.val("健身场地面积");
    		else if(self.attr("id")=="member")self.val("会员数量");
    		else if(self.attr("id")=="contact")self.val("联 系 人");
    		else if(self.attr("id")=="phone")self.val("联系电话");
    	}else {self.css("color","#ffffff");}
    });
    
});
function check(){
	//$("#companyInfo").submit(function(){
    	var pass = true;
    	if($("#company").val()=="公司名称"){
    		$("#company").css("border-color","#fa0000");
    		pass = false;
    	}
    	if($("#address").val()=="公司地址"){
    		$("#address").css("border-color","#fa0000");
    		pass = false;
    	}
    	if($("#area").val()=="健身场地面积"){
    		$("#area").css("border-color","#fa0000");
    		pass = false;
    	}
    	if($("#member").val()=="会员数量"){
    		$("#member").css("border-color","#fa0000");
    		pass = false;
    	}
    	if($("#contact").val()=="联 系 人"){
    		$("#contact").css("border-color","#fa0000");
    		pass = false;
    	}
    	if($("#phone").val()=="联系电话"||!isTelephone($("#phone").val().trim())){
    		$("#phone").css("border-color","#fa0000");
    		pass = false;
    	}
    	
    	
    	
    	return pass;
    //});
}

function isTelephone(obj)// 正则判断
{ 
	var pattern=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0?1[3|4|5|8|7][0-9]\d{8}$)/; 
	if(pattern.test(obj)) { 
		return true; 
	}else{ 
	return false;} 
} 
function submitF(){
	if(!check())return;
	$('#companyInfo').submit(function(){
		 $('#companyInfo').ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'http://www.zhaiker.cn/fatburn/GymApplyAction!add.zk', // 需要提交的 url
            data: {
                'companyName':$("#company").val(),
                'companyAddress': $("#address").val(),
				'area':$("#area").val(),
				'vipNumber':$("#member").val(),
				'contact':$("#contact").val(),
				'contactPhone':$("#phone").val()
            },
            success: function(result){
				var result = eval('('+result+')');
				if (result.STATUS){
					$('#companyInfo').hide();
					$('#submitSuc').show();
				} else {
				   
				}
			}
            //$('#companyInfo').resetForm(); // 提交后重置表单
        });
        return false; // 阻止表单自动提交事件
    });
}


/**
 * 去第几页
 * @param {Object} index
 */
var lastIdx = 0;
var playOver = true;
function goPage(idx){
	if(lastIdx==idx||!playOver)return;
	playOver = false;
	$(".pageBox").animate({top:"-"+($(window).height()*idx)+"px"},function(){
		playOver = true;
	});
	$($("#pageBar_ul li").get(lastIdx)).removeClass("bar_current").addClass("bar_normal");
	$($("#pageBar_ul li").get(idx)).removeClass("bar_normal").addClass("bar_current");
	lastIdx = idx;
}