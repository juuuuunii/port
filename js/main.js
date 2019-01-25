$(document).ready(function() {
	
	var agent = navigator.userAgent.toLowerCase();
	 
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// IE
		if (isIE () && isIE () < 9) { funcIEScroll(); }
		else { recheck(); }

	} else {
		recheck();
	}

});


$(window).scroll(function(){
	var agent = navigator.userAgent.toLowerCase();
	 
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// IE
		if (isIE () && isIE () < 9) { funcIEScroll(); }
		else { recheck(); }
		
	} else {
		recheck();
	}
});


$(window).resize(function(){
	var agent = navigator.userAgent.toLowerCase();
	 
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// IE
		if (isIE () && isIE () < 9) { funcIEScroll(); }
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
	var view_port_s = window_top;
	var view_port_e = window_top + window_height;
	
	if ( timer ) {
	  clearTimeout( timer );
	}
	$('.fly_right').each(function(){
	  var block = $(this);
	  var block_top = block.offset().top;
	  var block_height = block.height();
	  var windowHeight = $(window).height();

	  if ( block_top < view_port_e ) { timer = setTimeout(function(){ block.addClass('show-block'); },100); }
	  else { timer = setTimeout(function(){ block.removeClass('show-block'); },100); }
	});


}

/*************** portfolio ****************/
//silde
var n = 1;
var interval;
var Num;
var NumOld;
$("#slides").find(".slide").each(function(){
	Num = $(this).index();
	var html = '<a onclick="paging(this);">'+Num+'</a>';
	$(".pager").append(html);
});
interval = setInterval(slide, 5000);
function slide() {
	$("#slides").parent().find(".pager").find("span").removeClass("w3-text-amber");
	$("#slides").parent().find(".pager").find("span").eq(n).addClass("w3-text-amber");
	$("#slides").stop().animate({"left":-(n*100)+"%"}, 1000, function(){
		if(n == 4) {
			n = 0;
			$(this).css({"left":0});
		}
		n++;
	});
}
function paging(obj) {
	n = $(obj).index();
	clearInterval(interval);
	slide();
	interval = setInterval(slide, 5000);
}
$("#slides").hover(function(){
	clearInterval(interval);
}, function(){
	interval = setInterval(slide, 5000);
});

// slide_hover
$(".slide").mouseenter(function() {
    Num = $(this).index();
	$(".sli_txt").eq(Num).css({"margin-top":"200px", "opacity":0, "display":"block"}).stop().animate({"margin-top":0, "opacity":1}, 600);
	if(Num == 0, 1) {
		$(".go_site").css({"color":"#dd3055"});
	}
	else if(Num == 2) {
		$(".go_site").css({"color":"#019751"});
	}
	else {
		$(".go_site").css({"color":"#3e7cce"});
	}	
});

$(".slide").mouseleave(function() {
    NumOld = Num
    $(".sli_txt").eq(NumOld).stop().animate({"margin-top":"200px", "opacity":0}, 600, function () {
		$(this).hide();
	});
});

// go_site
$(".go_site").mouseenter(function() {
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

$(".go_site").mouseleave(function() {
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

/*************** about ****************/
$(".ab_nohove").mouseenter(function() {
	$(this).stop().animate({"left":"-100%"})
	$(".ab_hove").stop().animate({"left":"0"})
})