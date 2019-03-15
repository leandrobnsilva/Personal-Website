function size(){
	if($(window).width()<950){
		$(".main").css("width","540px");
		$(".main .logo").css({"width":$(".main").width(), "background-size":"38%", "height":"450px"});
		$(".main .container").css({"width":$(".main").width(), "min-height":"0"});
	} else {
		$(".main").css("width","900px");
		$(".main .logo").css({"width":"300px", "background-size":"65%", "height":$(".container").height()});
		$(".main .container").css("width","600px");
		$(".main .logo, .main .container").css("min-height","450px");
	}
}
function load(page){
	$(".load").css("opacity","0");
	setTimeout(function(){
		$(".load").load("pages/"+page+".php", function(response, status, xhr){
			if(status == "success") {
				if($(window).width()>=950){
					$(".logo").css({"height":$(".container").height()});
				}
				setTimeout(function(){
					$(".load").css("opacity","1");
				}, 200);
			}
			if(status == "error") {
				$(".load").load("pages/404.php", function(response, status, xhr){
					if(status == "success") {
						if($(window).width()>=950){
							$(".logo").css({"height":$(".container").height()});
						}
					}
				});
				setTimeout(function(){
					$(".load").css("opacity","1");
				}, 200);
			}
		});
	}, 200);
}
$(window).resize(function(){
	size();
});
$(document).ready(function(){
	size();
	if(location.hash){
		load(location.hash.replace("#",""));
	}else{
		load("index");
	}
	numSquares = parseInt($(".logo").attr("squares"));
	squareColor = $(".logo").attr("color");
	squareOpacity = parseFloat($(".logo").attr("opacity"));
	squareScale = parseFloat($(".logo").attr("scale"));
	squareWidth = 100 / numSquares;
	currOpacity = squareOpacity;
	for(i = 0; i < numSquares; i++){
		currOpacity += squareScale;
		$(".logo").append("<div style='background-color:rgba("+squareColor+","+currOpacity+");width:"+squareWidth+"%;height:10px;float:left;'></div>");
	}
	numMenus = parseInt($(".menu .button").length);
	menuColor = $(".menu").attr("color");
	menuOpacity = parseFloat($(".menu").attr("opacity"));
	menuScale = parseFloat($(".menu").attr("scale"));
	eachMenuWidth = 100 / numMenus;
	currOpacity = menuOpacity;
	for(i = 0; i < numMenus; i++){
		currOpacity -= menuScale;
		$(".menu .button").eq(i).css("background","rgba("+menuColor+","+currOpacity+")");
	}
});
amount = $(".menu .button").length;
$(".menu .button").each(function(){
	width = 100/amount+"%";
	$(this).css({"width":width});
	height = parseInt($(this).width());
	if(height > 120) lineHeight = 120;
	else lineHeight = height;
	$(this).css({"height":height+"px", "line-height":lineHeight+"px"});
});
$(document).on("click", ".menu .button", function(){
	url = $(this).attr("url");
	location.hash=url;
	load(url);
});
$(document).on("click", "#contact input[type=button]", function() {
	var datastring = $("#contact form").serialize();
	$.post("./src/contact.php", datastring, function(result){
		$("#contact #result").html(result);
	});
});