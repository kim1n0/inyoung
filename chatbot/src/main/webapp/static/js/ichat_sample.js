
	var sessionKey = "";
	var categoryData = "";

	// oneway greet, push message variables
	var greetQuery;
	var pushQuery;
	var changeQuery;
	var greet;

	// 사용자 대기 이벤트
	var userWaitTime = 60 * 1000;
	var userRefreshTime = 3600 * 1000;
	var eventBool = true;
	var refreshBool = true;
	var timer;
	var timer_R;
	
	// UI제어 변수 
	var cardCount = 0;
	var dropCount = 0;
	var buttonHeightCnt = 0;
	/*var lang = getLanguage();*/
	
	//최초 사용자-챗봇 세션 연동 및 그리팅 메시지 전송
	$(document).ready(function() {
		/*$('#language').val(lang);
		if(lang.includes('ko')){
			projectId = '3a14c1b110bc';		// 한국어
			$('#lang_ko').prop("checked", true);
			$('#lang_en').prop("checked", false);
		}
		else{
			projectId = '3a14c1b110bc';		// 영어
			$('#lang_en').prop("checked", true);
			$('#lang_ko').prop("checked", false);
		}

		$("input:radio[name=lang_radio]").click(function(){
			if($(this).val()=="ko"){
		    	changeProject('3a14c1b110bc');
		    }else{
		    	changeProject('3a14c1b110bc');
		    }
	    });*/
		greetQuery = projectId + '_g';
		pushQuery = projectId + '_p';

		async.waterfall([
		// Step #1. 세션키 가져오기
		function (callback) {
			getSeesionKey(callback);
		},
		// Step #2. 카테고리 데이터 가져오기
//		function (callback) {
//			getCategoryData("0", callback);
//		},
		// Step #3. 그리팅 메세지 보내기		
		function (callback) {
			greet = true;
			oneWayQuery(greet);
		}], 
		function (err) {
			if (err) {
				console.log(err);
			} else {
				// 기본 메시지의 시간을 현재 시간으로 변경
				$(".time:last").text(getHour());
				// 질문창 포커스
				$("#sentence").focus();
			}
		});
	});

	

	/*
	 * 질문 함수
	 */
	function doQuestion(userQuery, hidden_query) {
		if(!refreshBool)	return false;
	
		var query = userQuery ? userQuery : $('#sentence').val();		// 사용자 질문 전달 받을시 해당 질문 사용, 없다면  질문 입력창에 있는 값 사용  
		var blank_query = query;
		blank_query = blank_query.replace(/^\s+|\s+$/g, "");			// 앞뒤 공백 제거
		
		if (blank_query != "") {										// 사용자 질문이 빈 값이 아닐 경우에 대화 시작

			if(hidden_query == undefined)		hidden_query = query;
//			if (hidden_query) 	document.getElementById("hidden_query").value = hidden_query;
			clearBottomButton();
			
			if (eventBool) {
				eventBool = false;
				$("#sentence").on("keydown", function () {
					clearInterval(timer);
					timer = window.setTimeout(oneWayQuery, userWaitTime);
				});
			}
			if (refreshBool) {
				// refreshBool = false;
				$("#sentence").on("keydown", function () {
					clearInterval(timer_R);
					timer_R = window.setTimeout(refreshQuery,userRefreshTime);
				});
			}
			var ajaxSend = true;
			var jsonData = undefined;

			// input hidden_query text into hidden input tag
//			var hidden_query = $('#hidden_query').val().length > 0 ? $('#hidden_query').val() : query;
			hidden_query = hidden_query.replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi," ");	// html태그 없애기
			
			if (query.length > 0) {
				if (ajaxSend) {
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
							var tempStr = "";
							tempStr += QUESTION_TOP_HTML;
							tempStr += unescape(hidden_query);
							tempStr += QUESTION_BOTTOM_HTML;
							tempStr += LOADING_HTML;

							$(".search_boxs").append(tempStr);
							$(".time:last").text(getHour());
							$(".search_boxs").scrollTop($('.search_boxs')[0].scrollHeight);
							$('#search_boxs').scrollTop(500);
							$("#sentence").val("");
							$('#hidden_query').val("");
						},
						success: ajaxAnswerSuccess,
						error: ajaxAnswerError
					});
				}
			}
		}
	}

	/*
  * 답변 박스 생성 함수
  * @a 템플릿 wrapping한 string html data
  * @b 템플릿 wrapping 전 json
  */
	function doAnswer(a, b) {
		/* a를 객체로 만들고
		 * a에 메세지에 스트링 값을 넣고
		 * 바텀 스와이퍼는 따로 조건문 추가하여 붙일 수 있도록
		 */
		
		$('#loading').remove();
		//$('#loading').delay(3000).fadeOut(0);
		if (a.bottomAnswer) {
			if (a.resultAnswer === '') a.resultAnswer = DEFAULT_BOTTOM_ANSWER;
			$(".demoview").append(a.bottomAnswer);
		}
		
		var tempStr = ANSWER_TOP_HTML;
		tempStr += a.resultAnswer ? a.resultAnswer : a;
		tempStr += ANSWER_BOTTOM_HTML;

		$(".search_boxs").append(tempStr);
//		if (b && hasSwipe(b)) {
//			activateSwiper(b);
//		}
		var tmp = {};
		if(IsJsonString(b)){
			if(b.cards != undefined){
				tmp.cards = b.cards;
				activateSwiper(tmp);
			}
			if(b.buttons != undefined){
				if(b.buttons.length == undefined){
					if(b.buttons.type === 'swipe' || b.buttons.type == 'swipe_bottom' || b.buttons.type == 'swipe_lines'){	
						tmp.buttons = b.buttons;
						activateSwiper(tmp);
					}
				}
				else{
					for(var i=0;i<b.buttons.length;i++){
						if(b.buttons[i].type === 'swipe' || b.buttons[i].type == 'swipe_bottom' || b.buttons.type == 'swipe_lines'){
							tmp.buttons = b.buttons[i];
							activateSwiper(tmp);
						}	
					}
				}
			}
		}
		
		
		var wid;
		var max = 0;
		$('div[name="cardSize'+cardCount+'"]').each(function (i, v) {
			wid = $(this).height();
			//console.log(i + 1 + "번째 카드: " + wid);
		    if(max < wid){
		    	max = wid;
		    }
		});
		//console.log("max : " + max);
		$('div[name="cardSize'+cardCount+'"]').each(function (i, v) {
			$(this).css('height', max);			
		});
		cardCount++;

		$(".time:last").text(getHour());
		var all = $(".search_boxs").prop('scrollHeight'); //전체 사이즈
		var lastH = $(".answer_box:last").prop('offsetHeight'); // 마지막 말풍선 사이즈
		var minus = 0;
		if(lastH > 481){
			minus = all - lastH;
			$(".search_boxs").scrollTop(minus - 150);
		}else{
			$(".search_boxs").scrollTop($('.search_boxs')[0].scrollHeight);
		}
		$('#sentence').keydown();

		$('div[name=greeting'+buttonHeightCnt+']').mouseover(function (e) {
			var img = $(this).find('img').attr("src");
			img = img.replace(".png", "-1.png");
			$(this).find('img').attr("src", img);
			//console.log(img);
 		}).mouseout(function (e) {
			var img = $(this).find('img').attr("src");
			img = img.replace("-1.png",".png");
 			$(this).find('img').attr("src", img);
 		});
		buttonHeightCnt++;
	}


	Array.prototype.contains = function (elem) {
		for (var i in this) {
			if (this[i] == elem) return true;
		}
		return false;
	};
	
	var dropSelect = function dropSelect(p){
		var drop = $('select[name='+p+'] option:selected').val();
		var drop_text = $('select[name='+p+'] option:selected').text();
		doQuestion(drop, drop_text);
	}

	/* 
  * ajax 통신 성공 콜백 함수
  */
	function ajaxAnswerSuccess(jsonData) {
		if (JSON.stringify(jsonData) == "{}") {
			callback('iChatResponseIsNone');
		} else {
			//답변박스
			var data = jsonData.answer;
			console.log(data);
				
			if(data.indexOf('"hidden_query"') !=-1){
				//console.log("===============");
				//$("#sentence").attr("readonly",true);
			}else{
				$("#sentence").attr("readonly",false);
			}
			
//			console.log(data);
			if (data != undefined) {
				try {
					var jAnswer = JSON.parse(data);					
					
					doAnswer(wrapTemplate(jAnswer), jAnswer);
				} catch (e) {
					 console.log(e);
					doAnswer(data);
				}
			} else {
				doAnswer(ERROR_MESSAGE);
				console.log("ajaxAnswerError error : data is undefined");
			}
		}
	}

	/* 
  * swiper 동작 initiate 함수
  * @json swiper click event 위한 파라미터
  */
	function activateSwiper(json) {
		if (json.buttons) {
			var button_length = json.buttons.button.length;
			var button_height = json.buttons.height;
//			if(button_height == undefined)	button_height = 1; 
			var config = {
				'swipe': {
					selector: '.swiper-container:not(.swiper-container-horizontal)',
					sliderPerView: [button_length < 4 ? button_length : 4, 2, 3],
					slidesPerColumn: [button_height == undefined ? 1 : button_height]
				},
				'swipe_bottom': {
					selector: '.swiper-container.bottom:not(.swiper-container-horizontal)',
					// sliderPerView: [button_length < 5 ? button_length : 5, 4, 3]
					sliderPerView: [button_length < 5 ? button_length : 5, 'auto', 4],
					slidesPerColumn: [button_height == undefined ? 1 : button_height]
				},
				'swipe_lines': {
					selector: '.greet-container:not(.swiper-container-horizontal)',
					// sliderPerView: [button_length < 5 ? button_length : 5, 4, 3]
					sliderPerView: [button_length < 5 ? button_length : 3, 3, 3],
					slidesPerColumn: [button_height == undefined ? 1 : button_height]
				}
			}
			var option = config[json.buttons.type];
			var parameters = {
				slidesPerView: option.sliderPerView[0],
				slidesPerColumn: option.slidesPerColumn[0],
				spaceBetween: 10,
				//freeMode: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				breakpoints: {
				    480: {
				      slidesPerView: option.sliderPerView[1],
				      spaceBetween: 10
				    },
				    768: {
				      slidesPerView: option.sliderPerView[2],
				      spaceBetween: 10
				    }
				  }
			}
			
			if (json.buttons.type === 'swipe_bottom') {
				parameters.navigation = {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
				
				$('.swiper-container.bottom').on('mouseenter', function () {
					$(this).children().each(function (i, v) {
						return $(v).attr('class').indexOf('swiper-button') > -1 ? $(v).css('display', 'flex') : undefined;
					});
				});
				$('.swiper-container.bottom').on('mouseleave', function () {
					$(this).children().each(function (i, v) {
						return $(v).attr('class').indexOf('swiper-button') > -1 ? $(v).css('display', 'none') : undefined;
					});
				});
			var t = new Swiper(option.selector, parameters);
			}else{
				var t = new Swiper(option.selector, parameters);
			}
			
			//var t = new Swiper(option.selector, parameters);
			
			$('.swiper-container:last .slide-contents').each(function (i, v) {
				$(v).parent().on('click', function (e) {
					if (json.buttons.button[i].url) moveToUrl(json.buttons.button[i].url);
					else if (json.buttons.button[i].hidden_query) doQuestion(json.buttons.button[i].hidden_query, json.buttons.button[i].buttonname);
					else doQuestion(json.buttons.button[i].buttonname);
					// if (json.buttons.type === 'swipe_bottom') $(v).parent().parent().parent().remove();
					// clearBottomButton(); // 하단버튼 클릭 시 삭제처리
				});
			});
		} if (json.cards) {
			var card_length = json.cards.length;
			var config = {
					selector: '.swiper-container:not(.swiper-container-horizontal)',
					sliderPerView: [card_length < 3 ? card_length : 3, 1, 2]
				}
			var parameters = {
//				slidesPerView: config.sliderPerView[0],
				slidesPerView: 'auto',
				//freeMode: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
			}
			
			var t = new Swiper(config.selector, parameters);
		}
	}
	

	/* 
	  * JSON 형식 템플릿 wrapping 함수
	  * @json 답변 JSON 파라미터
	  */
		function wrapTemplate(json) {
			var resultAnswer = '';
			var bottomAnswer = '';
			if(IsJsonString(json)){
				for (var answerType in json) {
					if (json.hasOwnProperty(answerType)) {
	//					console.log("answerType : "+answerType);
	//					console.log("json["+answerType+"] : "+json[answerType]);
						if(answerType == "message")			resultAnswer += wrapMessage(json[answerType],'');
						else if(answerType == "image")		resultAnswer += wrapImage(json[answerType]);
						else if(answerType == "card")		resultAnswer += wrapCard(json[answerType]);
						else if(answerType == "cards")		resultAnswer += wrapCards(json[answerType]);
						else if(answerType == "buttons"){
							resultAnswer += wrapButton(json[answerType]);
						}
					}
				}
			}
			else{
				resultAnswer += wrapMessage(json,'');
			}
			var answerObj = {}
			answerObj.resultAnswer = resultAnswer;
			if (bottomAnswer !== '') answerObj.bottomAnswer = bottomAnswer;
			return answerObj;
		}
