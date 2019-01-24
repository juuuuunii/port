/*************** portfolio ****************/

var n = 1;
var interval;
var Num;
var NumOld;
$("#slides").find(".slide").each(function(){
    Num = $(this).index();
	var html = '<span onclick="paging(this);">'+Num+'</span>';
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

$(".slide").mouseenter(function() {
    Num = $(this).index();
    $(".sli_txt").eq(Num).css({"margin-top":"200px", "opacity":0, "display":"block"}).stop().animate({"margin-top":0, "opacity":1}, 600);	
});
$(".slide").mouseleave(function() {
    NumOld = Num
    $(".sli_txt").eq(NumOld).stop().animate({"margin-top":"200px", "opacity":0}, 600, function () {
		$(this).hide();
	});
	
});
$(".go_site").mouseenter(function() {
    Num = $(this).index();
    if (Num == 0, 1) {
        $(this).css({"border":"0", "background-color":"#dd3055"});	
    }  
    else if (Num == 2) {
        $(this).css({"border":"0", "background-color":"#019751"});	
    }
    else (Num == 3) {
        $(this).css({"border":"0", "background-color":"#3e7cce"});
    }
});