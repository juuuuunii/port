/*************** gnb ****************/
var WheelScroll = (function() {
	function WheelScroll(_opt) {
		var obj = this;  //this = function
		if(_opt) {
			if(_opt.page)  this.page = $(_opt.page);
			else this.page = $(".pages");
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
		}
		else {
			this.page = $(".pages");
			this.speed = 200;
			this.nav = null;
		}
		this.scTop = $(window).scrollTop();
		this.gap = [];
		this.oldNow = 0;
		this.now = 0;
		this.dir = 0;
		this.speedGap = 0;
		
		$(window).resize(function() {
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
		}).trigger("resize");
		this.init(this);
		if(_opt.nav) this.navAdd(obj, _opt.nav);
	}
		
	WheelScroll.prototype.init = function(obj) {
		$(window).scroll(function(){
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
			obj.scTop = $(window).scrollTop();	
			for(var i=0; i<obj.gap.length; i++) {
				if(obj.scTop <= obj.gap[i] + 500) {
					obj.now = i;
					break;
				}
			}
			//console.log(obj.now)
		});
	}
	WheelScroll.prototype.navAdd = function(obj, navObj) {
		$(navObj).on("click", function() {
			obj.oldNow = obj.now;
			obj.now = $(this).data("now");
			obj.animation(obj, null);
		});
	}
	WheelScroll.prototype.animation = function(obj, fn) {
		obj.speedGap = Math.abs(obj.now - obj.oldNow);
		$("html, body").stop().animate({"scrollTop":obj.gap[obj.now]+"px"}, obj.speed*obj.speedGap, fn);
	}
	return WheelScroll;
}());

var pages = new WheelScroll({
	page: ".pages", 
	nav: ".nav_bt",
	speed: 700
});


/*************** portfolio ****************/
//silde
$(window).resize(function(){
	$(".ports").height($(".port_wrap").height());
}).trigger("resize");

var portNum = 0;	//현재의 index
var portLen = $(".ports > li").length - 1;	//마지막 index (예:5개라면 0,1,2,3,4 -> 4)
var duration = 500;	//animate 속도
$(window).resize(function(){
	//본 작업을 진행하는 이유는 absolute 되어 있는 객체의 높이를 계산하기 위해서..
	$(".ports").height($(".ports > li").eq(portNum).height() + 30);
}).trigger("resize");
//최초 한번 실행
$(".ports > li").each(function(i){
	$('<i class="fa-circle"></i>').appendTo("#port_pager").click(function(){
		var iNum = $(this).index();
		if(portNum < iNum) {
			$(".ports > li").eq(portNum + 1).hide();
			$(".ports > li").eq(iNum).show().css({"left":"100%"});
			portNum = iNum;
			portAni("-100%");
		}
		else if(portNum > iNum) {
			$(".ports > li").eq(portNum - 1).hide();
			$(".ports > li").eq(iNum).show().css({"left":"-100%"});
			portNum = iNum;
			portAni("100%");
		}
	});
});
portPos();
function portAni(val) {
	$(".ports > li").eq(portNum).css({"animation-name":"portAni", "animation-duration":duration*0.001+"s"});
	$(".ports").stop().animate({"left":val}, duration, portPos);
}
function portPos() {
	$(".ports").height($(".ports > li").eq(portNum).height() + 30);
	
	$(".ports > li").hide().css({"animation-name":""});
	$(".ports").css({"left":0});
	$(".ports > li").eq(portNum).show().css({"left":0});
	if(portNum == 0) {
		$(".ports > li").eq(portLen).show().css({"left":"-100%"});
		$(".ports > li").eq(1).show().css({"left":"100%"});
	}
	else if(portNum == portLen) {
		$(".ports > li").eq(portNum - 1).show().css({"left":"-100%"});
		$(".ports > li").eq(0).show().css({"left":"100%"});
	}
	else {
		$(".ports > li").eq(portNum - 1).show().css({"left":"-100%"});
		$(".ports > li").eq(portNum + 1).show().css({"left":"100%"});
	}
}
$("#port_lt").click(function(){
	if(portNum == portLen) portNum = 0;
	else portNum++;
	portAni("-100%");
});
$("#port_rt").click(function(){
	if(portNum == 0) portNum = portLen;
	else portNum--;
	portAni("100%");
});


// go_site
$(".go_site").mouseenter(function() {
	NumOld = Num
	$(this).css({"background-color":"#fff"});
	if(NumOld == 0, 1) {
		$(this).css({"color":"#dd3055"});
	}
	else if(NumOld == 2) {
		$(this).css({"color":"#019751"});
	}
	else {
		$(thus).css({"color":"#3e7cce"});
	}
});


$(".go_site").mouseleave(function() {
	Num = $(this).index();	
	if(Num == 0, 1) {
		$(this).css({"color":"#fff", "background-color":"#dd3055"});
	}
	else if(Num == 2) {
		$(this).css({"color":"#fff", "background-color":"#019751"});
	}
	else {
		$(this).css({"color":"#fff", "background-color":"#3e7cce"});
	}
});
$(".go_site").eq(0).trigger("mouseleave");

//weather
$("#modal_open").click(function(){
	$("#modal").show();
});
$("#modal_close").click(function(){
	$("#modal").hide();
});


$.ajax({
	url: "../json/city.json",
	type: "get",
	dataType: "json",
	success: function(data){
		var city = data.cities;
		var html = '';
		for(i=0; i<city.length; i++){
			html = '<option value="'+city[i].id+'">'+city[i].name+'</option>';
			$("#area").append(html);
		}
		$("#area").trigger("change");
	},
	error: function(xhr, status, error){
		console.log(xhr, status, error);
	}
});
//오늘의 날씨
$("#area").change(function(){
	var id = $(this).val();
	var city = $(this).find('option:selected').text();
	var appid = "9850c950c6a3c3a3ca7a04a13d867c1a";
	var units = "metric";
	var dt = new Date();
	var date = dt.getFullYear()+"년 "+(dt.getMonth()+1)+"월 "+dt.getDate()+"일";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			document.querySelector(".dl_icon").src = "../img/weather/"+data.weather[0].icon+".mp4";
			document.querySelector("#weather_wrap").load();
			$(".dl_area > span").html(city);
			$(".dl_date").html(date);
			$(".dl_temp").html(data.main.temp+'℃(최고: '+data.main.temp_max+'℃/최저: '+data.main.temp_min+'℃)');
			$(".dl_desc").html(data.weather[0].description);
			//console.log(data.main.temp);
			//console.log(data.main.temp_max);
			//console.log(data.main.temp_min);
			//console.log(data.weather[0].description);
			//console.log(data.weather[0].icon);
			$("#modal").hide();
		},
		error: function(xhr, status, error){
			console.log(xhr, status, error);
		}
	});
});


/*************** about ****************/
$(".ab_nohov").mouseenter(function() {
	Num = $(this).index();
	$(this).css({"left":"100%"});
	$(this).parents().find(".ab_hov").css({"left":"50%"});
});
$(".ab_hov").mouseleave(function() {
	$(this).css({"left":"-50%"});
	$(this).parents().find(".ab_nohov").css({"left":"0"});
});


/*************** fly_right ****************/
$(document).ready(function() {
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// IE
		if (isIE () && isIE () < 3) { funcIEScroll(); }
		else { recheck(); }
	} else {
		recheck();
	}
});
$(window).scroll(function(){
	var agent = navigator.userAgent.toLowerCase();
	 
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// IE
		if (isIE () && isIE () < 3) { funcIEScroll(); }
		else { recheck(); }
	} else {
		recheck();
	}
});
$(window).resize(function(){
	var agent = navigator.userAgent.toLowerCase();
	 
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// IE
		if (isIE () && isIE () < 3) { funcIEScroll(); }
		else { recheck(); }
	} else {
		recheck();
	}
});
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var funcIEScroll = function(){
	$(".fly_right").css("opacity","1");
	$(".fly_right").css("transform","translateY(0px) translateX(0px) scale(1) translate3d(0, 0, 0)");
	$(".fly_right").css("-webkit-transform","-webkit-translateY(0px) -webkit-translateX(0px) -webkit-scale(1) -webkit-translate3d(0, 0, 0)");
	$(".fly_right").css("-moz-transform","-moz-translateY(0px) -moz-translateX(0px) -moz-scale(1) -moz-translate3d(0, 0, 0)");
	$(".fly_right").css("-o-transform","-o-translateY(0px) -o-translateX(0px) -o-scale(1) -o-translate3d(0, 0, 0)");
}

var timer = 0;
function recheck() {
	var window_top = $(this).scrollTop();
	var window_height = $(this).height();
	var view_port_e = window_top + window_height;
	
	if ( timer ) {
	  clearTimeout( timer );
	}
	$('.fly_right').each(function(){
	  var block = $(this);
	  var block_top = block.offset().top;

	  if ( block_top < view_port_e ) { timer = setTimeout(function(){ block.addClass('show-block'); },100); }
	  else { timer = setTimeout(function(){ block.removeClass('show-block'); },100); }
	});

}