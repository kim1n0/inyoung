
	//설정값
	var wise_question_frm = document.question_frm;
	var wise_searchTextbox = wise_question_frm.sentence;

	var wise_resultDivID = "auto";               //자동완성레이어 ID
	var wise_hStartTag = "<strong>";                    //하이라이팅 시작 테그
	var wise_hEndTag = "</strong>";                     //하이라이팅 끝 테그
	var wise_bgColor = "#fff2f2";                  //선택빽그라운드색
	var wise_intervalTime = 500;                   //자동완성 입력대기 시간

	//고정값
	var wise_acResult = new Object();              //결과값
	var wise_acLine = 0;                           //자동완성 키워드 선택  위치(순번)
	var wise_searchResultList = "";                //자동완성결과리스트
	var wise_searchKeyword = "";	                 //검색어(한영변환안된)
	var wise_ajaxReqObj = "";                      //ajax request object

	var wise_keyStatus = 1;                        //키상태구분값
	var wise_acuse = 1;                            //자동완성사용여부
	var wise_engFlag = 0;                          //자동완성한영변환체크
	var wise_acDisplayFlag = 0;                    //자동완성 display 여부
	var wise_acArrowFlag = 0;                      //마우스이벤트용 flag
	var wise_acArrowOpenFlag = 0;                  //마우스이벤트용 flag
	var wise_acFormFlag = 0;                       //마우스이벤트용 flag
	var wise_acListFlag = 0;                       //자동완성 레이어 펼쳐진 상태 여부
	var wise_browserType = wise_getBrowserType();	 //브라우져타입
	var wise_keywordBak = "";                      //키워드빽업
	var wise_keywordOld = "";                      //키워드빽업
	var wise_projectName = wise_question_frm.projectName.value;
	wise_keywordBak = wise_keywordOld = wise_searchTextbox.value;

	//엔터체크
	function wise_handleEnter(event){
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
		if (keyCode == 13){
			doQuestion();
			return false;
		}
	}
	//마우스클릭시검색
	function wise_keywordSearch(keyword){
		wise_searchTextbox.value = keyword;
		wise_question_frm.submit();
	}

	//입력값 체크 - setTextbox
	function wise_setTextbox(flag, ev){
		var _event;
		var key;

		wise_stateChange();

		switch(wise_browserType)
		{
			case 1 : // IE
				_event = window.event;
				key = _event.keyCode;
				break;
			case 2 : // Netscape
				key = ev.which;
				break;
			default :
				key = _event.keyCode;
				break;
		}

		if(wise_keyStatus == 1 && flag && key != 13)
			wise_keyStatus = 2;
	}

	//자동완성레이어 상태변경 - wd
	function wise_stateChange(){
		wise_searchTextbox.onclick = wise_acDisplayView;
		wise_searchTextbox.onblur = wise_acDisplayCheck;
		document.body.onclick = wise_acDisplayCheck;
	}

	//자동완성레이어 보여 주기 - req_ipc
	function wise_acDisplayView(){
		wise_acDisplayFlag = 1;
		wise_acFormFlag = 0;
		wise_reqAcResultShow();
 	}

	//자동완성레이어 감추기전  체크 - dis_p
 	function wise_acDisplayCheck(){
		if(wise_acDisplayFlag){
			wise_acDisplayFlag=0;
			return ;
		}

		if(wise_acArrowFlag)
			return;

		if(wise_acFormFlag)
			return;

		wise_acDisplayHide();
	}

 	//자동완성레이어 감추기 - ac_hide
 	function wise_acDisplayHide(){
 		var resultDiv = document.getElementById(wise_resultDivID);

		if(resultDiv.style.display == "none")
			return ;

		wise_setDisplayStyle(0);
		wise_acListFlag = 0;
		wise_acLine = 0;
	}

 	//자동완성레이어 display style 설정 - popup_ac
 	function wise_setDisplayStyle(type){
 		var resultDiv = document.getElementById(wise_resultDivID);

 		if(type==0)	{
			resultDiv.style.display = "none";
//			wise_switchImage(0);
		}
		else if(type==1){
			resultDiv.style.display = "block";
//			wise_switchImage(1);
		}
		else if(type==2){
			resultDiv.style.display = "none";
//			wise_switchImage(1);
		}
 	}

 	//자동완성 결과 보기 요청 - req_ac2
 	function wise_reqAcResultShow(){
 		var resultDiv = document.getElementById(wise_resultDivID);

		if(wise_searchTextbox.value == "" || wise_acuse == 0)
        	wise_printAcResult();
			return ;

	 	if(wise_acListFlag && wise_acDisplayFlag)	{
	 		wise_acDisplayHide();
			return;
		}

		var o = wise_getAcResult();

	 	if(o && o[1][0] != "")
	 		wise_acResultShow(o[0], o[1]);
	 	else
	 		wise_reqSearch();
 	}

 	//자동완성 결과 object 리턴 - get_cc
 	function wise_getAcResult()	{
		var ke = wise_trimSpace(wise_searchTextbox.value);
	 	return typeof(wise_acResult[ke])=="undefined" ? null : wise_acResult[ke];
 	}

 	//자동완성 결과 object 생성 - set_cc
 	function wise_setAcResult(aq, al){
 		wise_acResult[aq] = new Array(aq, al);
 	}

 	//자동완성 결과 보기 - ac_show
 	function wise_acResultShow(aq, al){
		if(aq != wise_trimSpace(wise_searchTextbox.value))
			wise_engFlag = 1;
 		else
			if(aq && aq != "" && aq != wise_trimSpace(wise_searchTextbox.value))
				return ;

	 	wise_searchKeyword = aq;
	 	wise_searchResultList = al;
	 	wise_printAcResult();

	 	if(wise_searchResultList.length)
		 	wise_acListFlag = 1;
	 	else
			wise_acListFlag = 0;

	 	if(wise_acListFlag)	{
	 		wise_setAcPos(0);

			if(wise_browserType == 1)
				wise_searchTextbox.onkeydown = wise_acKeywordTextViewIE;
			else if(wise_browserType == 2)
				wise_searchTextbox.onkeydown = wise_acKeywordTextViewFF;
		}
	}

 	//자동완성결과 라인 위치 지정 - set_acpos
 	function wise_setAcPos(v){
 		wise_acLine = v;
		setTimeout('wise_setAcLineBgColor();', 10);
 	}

 	//자동완성레이어에 결과 출력 - print_ac
 	function wise_printAcResult(){
 		var resultDiv = document.getElementById(wise_resultDivID);

 		if(wise_acuse==0)
 			resultDiv.innerHTML = wise_getAcNoKeyword();
 		else
			if(wise_searchResultList[0] == "")
				resultDiv.innerHTML = wise_getAcNoResultList();
		 	else
		 		resultDiv.innerHTML = wise_getAcResultList();

		wise_setDisplayStyle(1); //자동완성창 보여줌.

	 	setTimeout('wise_setAcLineBgColor();', 10);
 	}

 	//자동완성 키워드 라인의 백그라운드색 설정 - set_ahl
 	function wise_setAcLineBgColor(){
 		var o1, o2, qs_ac_len;

		if(!wise_acListFlag)
			return;

		qs_ac_len = wise_searchResultList.length;
	 	for(var i=0;i<qs_ac_len;i++){
			o1 = document.getElementById('wise_ac' + (i+1));

			if(o1 != null){
				if((i+1) == wise_acLine){
					o1.style.backgroundColor = wise_bgColor;
					o1.style.color = "#C93502";
					o1.style.cursor = "pointer";
				}
				else{
					o1.style.backgroundColor = '';
					o1.style.color = "";
					o1.style.cursor = "";
				}
			}
		}
 	}

 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE) - ackhl
 	function wise_acKeywordTextViewIE(){
		var e = window.event;
		var ac, acq;
		var resultDiv = document.getElementById(wise_resultDivID);
		var qs_ac_len = wise_searchResultList.length;
		
	 	if(e.keyCode==39)
	 		wise_reqAcResultShow();

	 	if(e.keyCode==40 || (e.keyCode==9 && !e.shiftKey)){
		 	if(!wise_acListFlag){
				wise_reqAcResultShow();
			 	return;
			}

			if(wise_acLine < qs_ac_len)	{
				if(wise_acLine == 0)
					wise_keywordBak = wise_searchTextbox.value;

				wise_acLine++;

				ac = document.getElementById('wise_ac' + wise_acLine);
			 	acq = document.getElementById('wise_acqHidden' + wise_acLine);
			 	wise_keywordOld = wise_searchTextbox.value = ac.outerText;
			 	wise_searchTextbox.focus();
			 	wise_setAcLineBgColor();
			 	e.returnValue = false;
		 	}
	 	}

	 	if(wise_acListFlag && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey))){
			if(!wise_acListFlag)
				return;

		 	if(wise_acLine <= 1){
		 		wise_acDisplayHide();
			 	wise_keywordOld = wise_searchTextbox.value = wise_keywordBak;
		 	}
		 	else{
				wise_acLine--;

				ac = document.getElementById('wise_ac' + wise_acLine);
			 	acq = document.getElementById('wise_acqHidden' + wise_acLine);
			 	wise_keywordOld = wise_searchTextbox.value = ac.outerText;
			 	wise_searchTextbox.focus();
			 	wise_setAcLineBgColor();
			 	e.returnValue = false;
			}
		}
	 	
	}

 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE외 브라우져) - ackhl_ff
 	function wise_acKeywordTextViewFF(fireFoxEvent){
		var ac, acq;
		var resultDiv = document.getElementById(resultDiv);
		var qs_ac_len = wise_searchResultList.length;
	 	if(fireFoxEvent.keyCode==39)
	 		wise_reqAcResultShow();

	 	if(fireFoxEvent.keyCode==40 || fireFoxEvent.keyCode==9){
		 	if(!wise_acListFlag){
		 		wise_reqAcResultShow();
			 	return;
			}

			if(wise_acLine < qs_ac_len)	{
				if(wise_acLine == 0)
					wise_keywordBak = wise_searchTextbox.value;

				wise_acLine++;

			 	ac = document.getElementById('wise_ac' + wise_acLine);
			 	acq = document.getElementById('wise_acqHidden' + wise_acLine);

			 	wise_keywordOld = wise_searchTextbox.value = acq.value;

			 	wise_searchTextbox.focus();
			 	wise_setAcLineBgColor();
			 	fireFoxEvent.preventDefault();
		 	}
	 	}

	 	if(wise_acListFlag && (fireFoxEvent.keyCode==38 || fireFoxEvent.keyCode==9)){
			if(!wise_acListFlag)
				return;

		 	if(wise_acLine <= 1){
		 		wise_acDisplayHide();
			 	wise_keywordOld = wise_searchTextbox.value = wise_keywordBak;
		 	}
		 	else{
		 		wise_acLine-- ;

			 	ac = document.getElementById('wise_ac' + wise_acLine);
			 	acq = document.getElementById('wise_acqHidden' + wise_acLine);

			 	wise_keywordOld = wise_searchTextbox.value = acq.value;
			 	wise_searchTextbox.focus() ;
			 	wise_setAcLineBgColor() ;
			 	fireFoxEvent.preventDefault();
			}
		}
	}

 	//검색요청 - reqAc
 	function wise_reqSearch(){
		var sv;
		var ke = wise_trimSpace(wise_searchTextbox.value);

		ke = ke.replace(/ /g, "%20");

		while(ke.indexOf("\\") != -1)
			ke = ke.replace(/ /g, "%20").replace("\\", "");

		while(ke.indexOf("\'") != -1)
			ke = ke.replace(/ /g, "%20").replace("\'", "");

	 	if(ke == ""){
	 		wise_acDisplayHide();
			return;
		}

	 	sv = "/chatbot/projects/sample/autoComplete_sample.jsp?t="+wise_projectName+"&q=" + escape(encodeURIComponent(ke));
	 	wise_ajaxReqObj = wise_getXMLHTTP();

	 	if(wise_ajaxReqObj)	{
			wise_ajaxReqObj.open("GET", sv, true);
		 	wise_ajaxReqObj.onreadystatechange = wise_acShow;
	 	}

	 	try	{
			wise_ajaxReqObj.send(null);
	 	}catch(e){
			return 0;
		}
	}

 	//자동완성 결과 보기 - showAC
 	function wise_acShow(){
		if(wise_acuse == 1)	{
			if(wise_ajaxReqObj.readyState==4 && wise_ajaxReqObj.responseText && wise_ajaxReqObj.status==200){
				eval(wise_ajaxReqObj.responseText);
				wise_setAcResult(wise_searchKeyword, wise_searchResultList);
				wise_acResultShow(wise_searchKeyword, wise_searchResultList);
			}
	 	}
	 	else{
        	wise_printAcResult();
	 		wise_setDisplayStyle(1);
	 	}
 	}

 	//선택키워드저장 - set_acinput
 	function wise_setAcInput(keyword){
		if(!wise_acListFlag)
			return;

	 	wise_keywordOld = wise_searchTextbox.value = keyword;
	 	wise_searchTextbox.focus();
	 	wise_acDisplayHide();
 	}

 	//기능끄기 버튼을 눌렀을때 - ac_off
	function wise_acOff(){
		if(wise_searchTextbox.value == "")
			wise_setDisplayStyle(0);
		else
			wise_acDisplayHide();

		wise_acuse = 0;
	    if (wise_searchTextbox.value != "") {
	    	wise_setDisplayStyle(1);
	    	wise_acDisplayView();
	    	wise_searchTextbox.focus();
	    	wise_wi();
	    } else {
	    	wise_setDisplayStyle(0);
	    }
	    return false;
 	}
	function wise_acOn() {
		wise_acuse = 1;

	    if (wise_searchTextbox.value != "") {
	    	wise_setDisplayStyle(1);
	    	wise_acDisplayView();
	    	wise_searchTextbox.focus();
	    	wise_wi();
	    } else {
	    	wise_setDisplayStyle(0);
	    }
	    return false;
	}


	//자동완성 레이어 mouse on
	function wise_setMouseon(){
	 	wise_acFormFlag = 1;
 	}

	//자동완성 레이어 mouse out
 	function wise_setMouseoff()	{
	 	wise_acFormFlag = 0;
		wise_searchTextbox.focus();
 	}

 	//자동완성 결과 코드 - get_aclist
 	function wise_getAcResultList()	{
 		var keyword = "";
 		var keywordOrign = "";
 		var keyword = ""
 		var keywordLength = 0;
 		var lenValue = 60;
 		var text = "";
 		var count = 0;

 		var pos = 0;
 		var result = "";
 		if(wise_searchResultList != null && wise_searchResultList.length > 0){
			text += "<div class=\"box-tit-switch\">";
			text += "	<div class=\"selection-area\">";
			text += "		<span class=\"title\">자동완성 기능</span>";
			text += "		<label class=\"switch-btn\" for=\"cb1\">";
			text += "			<input class=\"switch-input\" id=\"cb1\" type=\"checkbox\" checked=\"checked\" onclick=\"onoff();\"/>";
			text += "			<span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>";
			text += "			<span class=\"switch-handle\"></span>";
			text += "		</label>";
			text += "	</div></div>";  
			text += "<ul class=\"list\">";
		 	for(var i=0;i<wise_searchResultList.length;i++)	{
		 		result = wise_searchResultList[i].split("|");
		 		keyword = keywordOrign = result[0];
				count = result[1];

				keywordLength = wise_strlen(keywordOrign);

				if(keywordLength > lenValue)
					keyword = wise_substring(keywordOrign, 0, lenValue) + "..";

				if(wise_engFlag == 0)
					pos = keywordOrign.toLowerCase().indexOf(wise_searchTextbox.value.toLowerCase());
				else if(wise_engFlag == 1)
					pos = keywordOrign.toLowerCase().indexOf(wise_searchKeyword.toLowerCase());

				if(pos >= 0){
					if(pos == 0){
						if(wise_engFlag == 0)
							keyword = wise_highlight(keyword, wise_searchTextbox.value, 0, wise_hStartTag, wise_hEndTag);
						else if(wise_engFlag == 1)
							keyword = wise_highlight(keyword, wise_searchKeyword, 0, wise_hStartTag, wise_hEndTag);
					}
					else if(pos == keywordOrign.length - 1)	{
						if(wise_engFlag == 0)
							keyword = wise_highlight(keyword, wise_searchTextbox.value, -1, wise_hStartTag, wise_hEndTag);
						else if(wise_engFlag == 1)
							keyword = wise_highlight(keyword, wise_searchKeyword, -1, wise_hStartTag, wise_hEndTag);
					}
					else{
						if(wise_engFlag == 0)
							keyword = wise_highlight(keyword, wise_searchTextbox.value, pos, wise_hStartTag, wise_hEndTag);
						else if(wise_engFlag == 1)
							keyword = wise_highlight (keyword, wise_searchKeyword, pos, wise_hStartTag, wise_hEndTag);
					}
				}
				text += "<li id='wise_ac" + (i+1) + "' onmouseover=\"wise_setAcPos('" + (i+1) + "')\" onFocus=\"wise_setAcPos('" + (i+1) + "');\" onmouseout=\"wise_setAcPos(0);\"  onBlur=\"wise_setAcPos(0);\">";
				text += "<a href=\"javascript:wise_setAcInput('" + keywordOrign + "');wise_keywordSearch('" + keywordOrign + "');\">" + keyword + "<input type=\"hidden\" id=\"wise_acqHidden" + (i+1) + "\" value=\"" + keywordOrign + "\"/>";
				text += "<span id='wise_acq" + (i+1) + "' style='display:none'></span></a></li>";
		 	}

		 	text += "</ul>";
			
		 	// if($('#locale').val()=='ko'){
		 		// text += "<div class=\"auto_foot\"><a href=\"javascript:wise_acOff();\" class=\"auto_off\">자동완성 닫기</a></div>";
		 	// }
		 	// else{
		 		// text += "<div class=\"auto_foot\"><a href=\"javascript:wise_acOff();\" class=\"auto_off\">close</a></div>";
		 	// }
	 	}
	 	return text;
	}
 	//자동완성 결과 없는 경우 - get_ac0
 	function wise_getAcNoResultList(){
 		var text = "";
 		var ment = "";
 		ment = "검색된 결과가 없습니다.";

 		text += "<div class=\"box-tit-switch\">";
		text += "	<div class=\"selection-area\">";
		text += "		<span class=\"title\">자동완성 기능</span>";
		text += "		<label class=\"switch-btn\" for=\"cb1\">";
		text += "			<input class=\"switch-input\" id=\"cb1\" type=\"checkbox\" checked=\"checked\" onclick=\"onoff();\"/>";
		text += "			<span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>";
		text += "			<span class=\"switch-handle\"></span>";
		text += "		</label>";
		text += "	</div></div>"; 
 		text += "<ul class=\"list\">";
 		text += "	<li>";
 		text += "<a>"+ment+"</a>";
 		text += "	</li>";
 		text += "</ul>";  

	 	return text;
 	}

 	//자동완성 키워드 없는 경우
 	function wise_getAcNoKeyword(){
 		var text = "";
 		var ment = "";
 		ment = "검색된 결과가 없습니다.";
 		text += "<div class=\"box-tit-switch\">";
		text += "	<div class=\"selection-area\">";
		text += "		<span class=\"title\">자동완성 기능</span>";
		text += "		<label class=\"switch-btn\" for=\"cb1\">";
		text += "			<input class=\"switch-input\" id=\"cb1\" type=\"checkbox\"  onclick=\"onoff();\"/>";
		text += "			<span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>";
		text += "			<span class=\"switch-handle\"></span>";
		text += "		</label>";
		text += "	</div></div>"; 
	 	return text;
 	}

 	//자동완성 복구시 키워드 없는 경우
 	function wise_getAcOnNoKeyword(){
 		var text = "";
 		var ment = "";
 		ment = "검색된 결과가 없습니다.";
 		text += "<div class=\"top\">";
		text += "	<p>자동완성 기능</p>";
		text += "	<div class=\"toggle_btn\">";
		text += "		<input class=\"tgl tgl-light\" id=\"cb1\" type=\"checkbox\" checked=\"checked\" onclick=\"onoff();\"/> <label class=\"tgl-btn\" for=\"cb1\"></label>";
		text += "	</div></div>";
 		text += "<ul class=\"list\">";
 		text += "	<li>";
 		text += "<a>"+ment+"</a>";
 		text += "	</li>";
 		text += "</ul>";
	 	return text;
 	}

 	//검색박스 키워드 처리 루프 - wi()
 	function wise_wi(){
		if(wise_acuse==0){
        	wise_printAcResult();
			return;
		}
		var keyword = wise_searchTextbox.value;

	 	if(keyword == "" && keyword != wise_keywordOld)
	 		wise_acDisplayHide();

		if(keyword != "" && keyword != wise_keywordOld && wise_keyStatus != 1){
			var o = null;

			o = wise_getAcResult();

			if(o && o[1][0] != "")
				wise_acResultShow(o[0], o[1]);
			else
				wise_reqSearch();
		}

		wise_keywordOld = keyword;
		
		setTimeout("wise_wi()", wise_intervalTime);
 	}

	setTimeout("wise_wi()", wise_intervalTime);

	function onoff(){
		if($("#cb1").is(":checked")){
        	wise_acOn();
//        	$("#cb1").attr('checked',true);
        	wise_printAcResult();
        }else{
        	wise_acOff();
//        	$("#cb1").attr('checked',false);
        	wise_printAcResult();
        }	
	}
	