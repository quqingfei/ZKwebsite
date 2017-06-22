$(function(){
	var total = $(".page").length;
	var index = 0;
	var isApple = true;
	
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
     
    $(".down_type").click(function(e){
    	if($("#select_box").is(":visible"))return;
    	if(isApple){
    		$("#select_box span").removeClass("apple_class").addClass("android_class");
    		$("#select_box a").html("Android&nbsp;客户端");
			$("#down_button").attr('href','http://zhaiker.oss-cn-hangzhou.aliyuncs.com/SportMobile_112.apk');
    	}else{
    		$("#select_box span").removeClass("android_class").addClass("apple_class");
    		$("#select_box a").html("IOS&nbsp;客户端");
			$("#down_button").attr('href','https://itunes.apple.com/cn/app/ran-zhi-bu-luo/id1081258525?mt=8');
    	}
    	$("#select_box").show();
    	return;
    });
    
    $("#select_box").click(function(e){
    	if(isApple){
    		$("#down_icon").removeClass("apple_class").addClass("android_class");
    		$("#down_app").html("Android&nbsp;客户端");
    	}else{
    		$("#down_icon").removeClass("android_class").addClass("apple_class");
    		$("#down_app").html("IOS&nbsp;客户端");
    	}
    	 $("#select_box").hide();
    	 isApple = !isApple;
    });
    
    setTimeout("changeScreen()",15000);
	
    $($(".title ul li a").get(0)).removeClass("title_buton").addClass("title_buton_hover"); 
    
    
    
});


/**
 * 切换屏幕
 */
var scIdx = 0;
function changeScreen(){
	scIdx++;
	var img;
	if(scIdx==0){
		 img = "url('./css/images/phone_home.jpg')";
	}else if(scIdx==1){
		 img = "url('./css/images/phone_run.jpg')";
	}else{
		 img = "url('./css/images/phone_report.jpg')";
	}
	
	$("#p1_phone_screen").fadeToggle(300,function(){
		$("#p1_phone_screen").css("background-image",img);
	});
	
	$("#p1_phone_screen").fadeIn();
	scIdx = scIdx==2?-1:scIdx;
	setTimeout("changeScreen()",15000);
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
		if(idx==2)playThree();
		if(idx==3)playFour();
		if(idx==1)playTwo();
	});
	$($("#pageBar_ul li").get(lastIdx)).removeClass("bar_current").addClass("bar_normal");
	$($("#pageBar_ul li").get(idx)).removeClass("bar_normal").addClass("bar_current");
	lastIdx = idx;
}
/**
 * 第三屏动画播放
 */
function playThree(){
		showPosAnimate("#t_bike",95,305,400);
		showPosAnimate("#t_mechine",483,60,400);
		showPosAnimate("#t_run",320,223,400);
		showPosAnimate("#t_heart",655,223,400);
		showPosAnimate("#t_weight",879,305,400);
		showPosAnimate("#t_ride",293,500,400);
		showPosAnimate("#t_hold",681,500,400);
}

/**
 * 播放位置动画
 */
function showPosAnimate(id,x,y,time){
	$(id).animate({top:y+"px",left:x+"px"},time);
}

var fourPlay = false;
function playFour(){
	if(fourPlay)return;
	fourPlay = true;
	setTimeout("playHeadIcon('#f_head_1')",100);
	setTimeout("playHeadIcon('#f_head_2')",200);
	setTimeout("playHeadIcon('#f_head_3')",300);
	setTimeout("playHeadIcon('#f_head_4')",400);
}

function playHeadIcon(id){
	var id_Y = (parseInt($(id).css("top").replace("px",""))-40)+"px";
	var id_X = (parseInt($(id).css("left").replace("px",""))-29)+"px";
	$(id).animate({top:id_Y,left:id_X,width:"58px",height:"80px"},200,function(){
		shake(id,200,60,-1);
	});
}

function shake(id,time,off,isup){
	if(off<10)return;
	if(isup==-1)
		off = (0.2*off);
	var top_Y = parseInt($(id).css("top").replace("px",""))+off*isup;
	isup = isup*-1;
	$(id).animate({top:top_Y+"px"},time,function(){
		shake(id,time*0.6,off,isup);
	});
}
/**
 * 第二屏播放
 */
var twoPlay = false;
function playTwo(){
	if(twoPlay)return;
	twoPlay = true;
	$(".two_phone_bg").animate({width:"600px",height:"600px",left:"0px",top:"0px"},500,function(){
		initTwoPage();
	});
}


function shakeSize(id,time,off,count){
	innershakeSize(id,time,off,count*2);
}
/**
 * 大小震动，果冻效果
 */
function innershakeSize(id,time,off,count){
	if(count==0)return;
	var isup = 1;
	if(count%2==0)
		isup = 1;
	else
		isup = -1;
		
	var target = $(id);
	var c_w = target.width();
	var c_h = target.height();
	var c_x =  parseInt(target.css("left").replace("px",""));
	var c_y =  parseInt(target.css("top").replace("px",""));
	var to_w = c_w+off*isup;
	var to_h = c_w+off*isup;
	var to_x = c_x-((to_w-c_w)/2);
	var to_y = c_y-((to_h-c_h)/2);
	count--;
	$(id).animate({top:to_y+"px",left:to_x+"px",width:to_w+"px",height:to_h+"px"},time,function(){
		innershakeSize(id,time*0.6,off,count);
	});
}
/**
 * 在元素中心点动态显示大小动画
 */
function showSizeAnimation(id,time,off){
	var target = $(id);
	var c_w = target.width();
	var c_h = target.height();
	var c_x =  parseInt(target.css("left").replace("px",""));
	var c_y =  parseInt(target.css("top").replace("px",""));
	var to_w = c_w+off;
	var to_h = c_w+off;
	var to_x = c_x-((to_w-c_w)/2);
	var to_y = c_y-((to_h-c_h)/2);
	console.log(to_x+"   "+to_y+"   "+to_w+"   "+to_h);
	$(id).animate({width:to_w+"px",height:to_h+"px",left:to_x+"px",top:to_y+"px"},time);
}
/**
 * 初始化第二屏
 */
function initTwoPage(){
	showSizeAnimation("#two_bike",200,(20+40*Math.random()));
	showSizeAnimation("#two_weight",200,(20+40*Math.random()));
	showSizeAnimation("#two_ride",200,(20+40*Math.random()));
	showSizeAnimation("#two_hold",200,(20+40*Math.random()));
	showSizeAnimation("#two_heart",200,(20+40*Math.random()));
	showSizeAnimation("#two_run",200,(20+40*Math.random()));
	showSizeAnimation("#two_mechine",200,(20+40*Math.random()));

}
