/*
 * get time method
 */
function getHour() {
	return convert12H(checkTime(new Date().getHours()) + ':' + checkTime(new Date().getMinutes()));
}


var changeProject = function changeProject(pId) {
	var query = "";
	projectId = pId;
	var temp = "";
	temp = chatbot_name;
	chatbot_name = chatbot_name2;
	chatbot_name2 = temp;
	ANSWER_TOP_HTML = ["<div class='box_wrap'>", "<ul class='answer_box'>", "<li class='name'><img src='"+profileImg+"' alt='' onclick='javascript:oneWayQuery(1)'/></li>","<li class='subname'>"+chatbot_name+"</li>","<li class='answer'>"].join('');
	LOADING_HTML = ["<div class='box_wrap' id='loading'>", "<ul class='answer_box'>", "<li class='name'><img src='"+profileImg+"' alt=''/></li>", "<li class='answer'>", "<div class='three-balls'>", "<div class='ball ball1'></div>", "<div class='ball ball2'></div>", "<div class='ball ball3'></div>", "</div>", "</li>", "</ul>", "</div>"].join('');

	greetQuery = projectId + '_g';
	pushQuery = projectId + '_p';
	changeQuery = projectId + '_c';
	
	var query = changeQuery;
	$('#sentence').off('keydown');
	var param = "?query=" + encodeURIComponent(query) + "&sessionKey=" + sessionKey + "&projectId=" + projectId;

	$.ajax({
		type: "GET",
		url: API_URL + "/iChatResponse" + param,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: "application/json; charset=utf-8",
		beforeSend: function beforeSend() {
			//질문 박스
			$(".search_boxs").append(LOADING_HTML);
			$(".time:last").text(getHour());
			$(".search_boxs").scrollTop($('.search_boxs')[0].scrollHeight);
		},
		success: ajaxAnswerSuccess,
		error: function error(request, status, _error) {
			doAnswer(ERROR_MESSAGE);
			console.log("oneWayQuery() error : " + _error);
		}
	});
	
	
}
function oneWayQuery(greet) {
	var query = greet ? greetQuery : pushQuery;
	$('#sentence').off('keydown');
	var param = "?query=" + encodeURIComponent(query) + "&sessionKey=" + sessionKey + "&projectId=" + projectId;

	$.ajax({
		type: "GET",
		url: API_URL + "/iChatResponse" + param,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: "application/json; charset=utf-8",
		beforeSend: function beforeSend() {
			//질문 박스
			$(".search_boxs").append(LOADING_HTML);
			$(".time:last").text(getHour());
			$(".search_boxs").scrollTop($('.search_boxs')[0].scrollHeight);
		},
		success: ajaxAnswerSuccess,
		error: function error(request, status, _error) {
			doAnswer(ERROR_MESSAGE);
			console.log("oneWayQuery() error : " + _error);
		}
	});
};

function refreshQuery(){
	$("#sentence").attr("readonly",true);
	if(refreshBool){
		var finish = REFRESH_MESSAGE;
		var finishAnswer = JSON.parse(finish);
		var a = wrapTemplate(finishAnswer);
		$('#loading').remove();
		var tempStr = ANSWER_TOP_HTML;
		tempStr += a.resultAnswer ? a.resultAnswer : a;
		tempStr += ANSWER_BOTTOM_HTML;
		$(".search_boxs").append(tempStr);
		$(".time:last").text(getHour());
		$(".search_boxs").scrollTop($('.search_boxs')[0].scrollHeight);
		$('#search_boxs').scrollTop(500);
		$('#sentence').keydown();
	}
	refreshBool = false;
}

function getSeesionKey(callback) {
	if (sessionKey == "") {
		$.ajax({
			type: 'POST',
			url: API_URL + "/sessionRequest",
			cache: false,
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			success: function success(jsonData) {
				if (JSON.stringify(jsonData) == "{}") {
					callback('SessionKeyIsNone');
				} else {
					sessionKey = jsonData.sessionKey;
					callback(null);
				}
			},
			error: function error(request, status, _error2) {
				callback(_error2);
			}
		});
	} else {
		callback(null);
	}
}
/*
 * 12시간 표시 변환 함수
 */
function convert12H(a) {
	var time = a; // 'hh:mm' 형태로 값이 들어온다
	var getTime = time.substring(0, 2); // 시간(hh)부분만 저장
	var intTime = parseInt(getTime); // int형으로 변환

	if (intTime < 12) {
		// intTime이 12보다 작으면
		var str = '오전 '; // '오전' 출력
	} else {
		// 12보다 크면
		var str = '오후 '; // '오후 출력'
	}

	if (intTime == 12) {
		// intTime이 12면 변환 후 그대로 12
		var cvHour = intTime;
	} else {
		// 나머지경우엔 intTime을 12로 나눈 나머지값이 변환 후 시간이 된다
		var cvHour = intTime % 12;
	}

	// 'hh:mm'형태로 만들기
	var res = str + ('0' + cvHour).slice(-2) + time.slice(-3);
	return res;
}

/*
 * 시간 포맷 변환 함수
 */
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
/*function getLanguage() {
  return navigator.language || navigator.userLanguage;
}*/
/* 
 * ajax 통신 에러 콜백 함수
 */
function ajaxAnswerError(request, status, error) {
	doAnswer(ERROR_MESSAGE);
	console.log("ajaxAnswerError error : " + error);
	callback(null);
}

/* 
 * scroll bottom 함수
 */
function scrollBottom() {
	$(".chat_area").mCustomScrollbar("scrollTo", "bottom", { scrollInertia: 10 });
}
/*
 * clear bottom button elements
 */
function clearBottomButton() {
	var bottomButtonEl = $('.swiper-container.bottom');
	if (bottomButtonEl) bottomButtonEl.remove();
}

/*
 * 
 */
function moveToUrl(url) {
	clearBottomButton();
	window.open(url, '_blank');
}


function IsJsonString(str) {
	try {
		return (typeof str === 'object');
	} catch (e) {
		console.log(e);
		return false;
	}
}
function isNumeric(num, opt){
	// 좌우 trim(공백제거)을 해준다.
	num = String(num).replace(/^\s+|\s+$/g, "");
	if(typeof opt == "undefined" || opt == "1"){
		// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
		var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}else if(opt == "2"){
		// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
		var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}else if(opt == "3"){
		// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
		var regex = /^[0-9]+(\.[0-9]+)?$/g;
	}else{
		// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
		var regex = /^[0-9]$/g;
	}
	if( regex.test(num) ){
		num = num.replace(/,/g, "");
		return isNaN(num) ? false : true;
	}else{
		return false;
	}
}

