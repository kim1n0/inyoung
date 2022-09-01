<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<!-- saved from url=(0013)about:internet -->
<html>

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">
<title>[SaaS기획팀] 현명한앤써니</title>
    <link href="/static/css/swiper.min.css"  rel="stylesheet" type="text/css">
    <link href="/static/css/default_sample.css" rel="stylesheet" type="text/css">
	<link href="/static/css/sample.css" rel="stylesheet" type="text/css">
	<link href="/static/css/autoComplete_sample.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="/static/js/jquery-latest.min.js"></script>
	<script type="text/javascript" src="/static/js/default_html.js"></script>
	<script type="text/javascript" src="/static/js/ichat_common.js"></script>
	<script type="text/javascript" src="/static/js/wrapFunction.js"></script>
	<script type="text/javascript" src="/static/js/async.min.js"></script>
	<script type="text/javascript" src="/static/js/ichat_sample.js"></script>
	<script type="text/javascript" src="/static/js/swiper.min.js"></script>
	<script type="text/javascript" src="/static/js/autoCompleteCommon.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
</head>
<body>
<script type="text/javascript">
	$(document).ready(function(){
		new Swiper('.guide', {
		pagination : {		// 페이징 설정
			el : '#guide_pagination',
			clickable : true,	// 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
		},
//			navigation : {
//				nextEl : '.swiper-button-next',
//				prevEl : '.swiper-button-prev',
//			},
	});

		if($.cookie('popup') == 'cookie'){
			$(".mainguide").hide();
		}
	});
	function guideOpen(){
		$(".mainguide").show();
	}
	function guideClose(){
		$(".mainguide").hide();
	}
	function guideNever(){
		if($.cookie('popup') == 'cookie'){
			$(".mainguide").hide();
		}else{
			$.cookie('popup', 'cookie',{ expires: 1});
			$(".mainguide").hide();
		}
	}
	<!-- $("#datepicker").datepicker(); -->
</script>
	<div class="demoview">
		<div class="wrap">
			<!-- guide swipe start
			<div class="mainguide">
				<h1 class="btnguide">
					<img class="_never" src="http://answerny.ai/chatbot/projects/mju/image/g_2.png" onclick="guideNever()">
					<img class="_close" src="http://answerny.ai/chatbot/projects/mju/image/g_3.png" onclick="guideClose()">
				</h1>
				<div class="swiper-container guide" id="guide_swipe">
					<div class="swiper-wrapper" >
						<div class="swiper-slide guide-slide" >
							<ul class="guideimg">
								<li ><img src="http://answerny.ai/chatbot/projects/mju/image/swipe_g_01.png"></li>
							</ul>
						</div>
						<div class="swiper-slide guide-slide">
							<ul class="guideimg">
								<li ><img src="http://answerny.ai/chatbot/projects/mju/image/swipe_g_02.png"></li>
							</ul>
						</div>
						<div class="swiper-slide guide-slide">
							<ul class="guideimg">
								<li ><img src="http://answerny.ai/chatbot/projects/mju/image/swipe_g_03.png"></li>
							</ul>
						</div>
						<div class="swiper-slide guide-slide">
							<ul class="guideimg">
								<li ><img src="http://answerny.ai/chatbot/projects/mju/image/swipe_g_03.png"></li>
							</ul>
						</div>
					</div>
					<div class="swiper-pagination" id="guide_pagination"></div>
				</div>
			</div>
			guide swipe end-->
			<div class="search_top">
				<h1> [SaaS기획팀] 현명한앤써니 ${profile_name} </h1>
			</div>

			<div class="search_result">
				<div class="search_boxs">
					<div class="box_wrap">
						<ul class="answer_box"></ul>
					</div>
					<div class="box_wrap">
						<ul class="question_box"></ul>
					</div>
				 </div>
			 </div>

			<div class="search_bottom">
				<form id="question_frm" name="question_frm" method="POST" action="javascript:doQuestion()">
					<input type="text" hidden="hidden" id="projectName" name="projectName" value="uniforce">
						<div id="auto" class="ark_wrap" style="display:none;" onmouseover="wise_setMouseon();" onmouseout="wise_setMouseoff();"></div>
						<div class="input_box">
							<input type="text" class="quesion_input" name="sentence" id="sentence" onfocus="return wise_setTextbox('0',event);" onmousedown="wise_setTextbox('1',event);" onkeydown="wise_setTextbox('1',event);" onkeyup="wise_handleEnter(event);" autocomplete="off">
							<input type="text" hidden="hidden" id="hidden_query">
							<script type="text/javascript" src="js/autoComplete_sample.js"></script>
								<a href="#" class="btn_send_thema" onclick="javascript:doQuestion();">
									<img src="http://211.39.140.249:7080/sample/image/send.png">
								</a>
						</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>