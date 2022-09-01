function wrapImage(imageJson, type){
	var result = "";
	if(type == 'card'){
		result += "<img src=\"" + imageJson.url + "\" width=\"100%\"></br>";
	}
	else
		result = "<div class=\"img_box\" style=\"text-align:center;\"><img src=\"" + imageJson.url + "\" width=\"" + imageJson.width + "\"></div>";
	return result;
}

function wrapMessage(message, type){
	var result = "";
	if(type == 'cardTitle'){
		result += "<p style=\"font-weight: bold; padding-left: 10px; padding-top: 7px;\">" + message + "</p>";
	}
	else if(type == 'cardContent'){
		result += "<p style=\"padding-left: 10px; \">" + message + "</p>";
	}
	else
		result = message;
	return result;
}

function warpLinkUrl(url, type){
	var result = "";
	if(type == 'card'){
		var pattern = /^(http|https):\/\/([a-z0-9-_\.]*)/i;
		var domain = url.match(pattern)[2].replace('www.', '');
		result += "<a href=\"javascript:moveToUrl('" + url + "')\"><p style=\"padding-left: 10px; color:#ccd3fe;padding-bottom: 8px;\">" + domain + "</p></a>";
	}
	else
		result = "<div class=\"img_box\" style=\"text-align:center;\"><img src=\"" + imageJson.url + "\" width=\"" + imageJson.width + "\"></div>";
	return result;
}

function makeButton(button, type){
	console.log("button : "+button);
	console.log("type : "+type);
	var result = "";
	if(type == 'normal'){
		button.forEach(function (element, i) {
			if (element.url) 							result += "<a href=\"javascript:moveToUrl('" + element.url + "')\" class=\"btn type_a\">" + element.buttonname + "</a>";
			else if (element.hidden_query == 'refresh') result += "<a href=\"javascript:window.location.reload();\" class=\"btn type_a\">" + element.buttonname + "</a>";
			else if (element.hidden_query) 				result += "<a href=\"javascript:doQuestion('" + element.hidden_query + "', '" + element.buttonname + "')\" class=\"btn type_a\">" + element.buttonname + "</a>";
			else 										result += "<a href=\"javascript:doQuestion('" + element.buttonname + "')\" class=\"btn type_a\">" + element.buttonname + "</a>";
		});
	}
	else if(type == 'swipe'){
		result += "<div class=\"swiper-container\">";
		result += " <div class=\"swiper-wrapper\">";
		button.forEach(function (element, i) {
			result += "  <div class=\"swiper-slide\">";
			if (element.image){
				if(element.width != undefined)			result += "   <div class=\"slide-image-wrap\"><img src=\"" + element.image + "\" width=\""+element.width+"\"></div>";
				else									result += "   <div class=\"slide-image-wrap\"><img src=\"" + element.image + "\"></div>";
			}
			result += "   <div class=\"slide-contents\">" + element.buttonname + "</div>";
			result += "  </div>";
		});
		result += " </div>";
		result += " <div class=\"swiper-pagination\"></div>";
		result += "</div>";
	}
	else if(type == 'swipe_lines'){
		result += "<div class=\"swiper-container greet-container\">";
		result += " <div class=\"swiper-wrapper\">";
		button.forEach(function (element, i) {
			result += "  <div class=\"swiper-slide greeting\" name='greeting"+buttonHeightCnt+"'>";
			if (element.image){
				if(element.width != undefined)			result += "   <div class=\"slide-image-wrap greeting-img\"><img src=\"" + element.image + "\"  style=\"width:"+element.width+";height:"+element.width+";\"></div>";
				else									result += "   <div class=\"slide-image-wrap greeting-img\"><img src=\"" + element.image + "\"></div>";
			}
			result += "   <div class=\"slide-contents greeting-contents\">" + element.buttonname + "</div>";
			result += "  </div>";
		});
		result += " </div>";
		result += " <div class=\"swiper-pagination\"></div>";
		result += "</div>";
	}

	else if(type == 'swipe_bottom'){
		result += "<div class=\"swiper-container bottom\">";
		result += " <div class=\"swiper-wrapper\">";
		button.forEach(function (element, i) {
			result += "  <div class=\"swiper-slide\">";
			result += "   <div class=\"slide-contents\">" + element.buttonname + "</div>";
			result += "  </div>";
		});
		result += " </div>";
		result += " <div class=\"swiper-button-next\"></div><div class=\"swiper-button-prev\"></div>";
		result += "</div>";
	}
	else if(type == 'card_buttons'){
		button.forEach(function (element, i) {
			if (element.url) result += "<a href=\"javascript:moveToUrl('" + element.url + "')\" class=\"btn type_a\">" + element.buttonname + "</a>";
			else if (element.hidden_query) result += "<a href=\"javascript:doQuestion('" + element.hidden_query + "', '" + element.buttonname + "')\" class=\"btn type_a\">" + element.buttonname + "</a>";
			else result += "<a href=\"javascript:doQuestion('" + element.buttonname + "')\" class=\"btn type_a\">" + element.buttonname + "</a>";
		});
		
	}
	else if(type == 'drop' || type == 'drop_h' || type == 'card_drop'){
		result += "<select name=\"dropList"+dropCount+"\" onchange=\"dropSelect(this.name)\">";
		button.forEach(function (element, i) {
			if (element.hidden_query) 	result += "<option value=\"" + element.hidden_query + "\">" + element.buttonname + "</a></option>";
			else 						result += "<option value=\"" + element.buttonname + "\">" + element.buttonname + "</option>";
		});
		result += "</select>";
	}
	else if(type == 'refresh'){
		button.forEach(function (element, i) {
			result += "<a href=\"javascript:location.reload();\" class=\"btn type_a\">" + element.buttonname + "</a>";
		});
	}
	return result;
}

function wrapButton(buttonJson){
	var result = "";
	var buttonType = "";
	var lines = "";
	console.log(JSON.stringify(buttonJson));
	for (var answerType1 in buttonJson) {
//		console.log("answerType1 : "+answerType1);
//		console.log("buttonJson["+answerType1+"] : "+buttonJson[answerType1]);
		if (buttonJson.hasOwnProperty(answerType1)) {
			if(isNumeric(answerType1,"1")){
				for (var answerType2 in buttonJson[answerType1]) {
//					console.log("answerType2 : "+answerType2);
//					console.log("buttonJson["+answerType1+"]["+answerType2+"] : "+buttonJson[answerType1][answerType2]);
					if (buttonJson[answerType1].hasOwnProperty(answerType2) && answerType2 == 'type') {
						result += wrapButton(buttonJson[answerType1]);
					}
				}
			}
			else{
//				console.log("answerType1 : "+answerType1);
//				console.log("buttonJson["+answerType1+"] : "+buttonJson[answerType1]);
				if(answerType1 == "type" ){
					buttonType = buttonJson[answerType1];
				}
				else if(answerType1 == "height" ){
					lines = buttonJson[answerType1];
				}
				else{
					result += makeButton(buttonJson[answerType1],buttonType);
					buttonType = "";
					lines = "";
				}
			}

		}
	}
	return result;
}

function wrapCard(cardJson){
	var result = "";
	var cnt = 0;
	var contentCnt = 0;
	for (var answerType in cardJson){
		if(answerType == "title" || answerType == "content") contentCnt++;
	}
	console.log(contentCnt);
	for (var answerType in cardJson) {
		if (cardJson.hasOwnProperty(answerType)) {
//			console.log("answerType : "+answerType);
//			console.log("cardJson["+answerType+"] : "+cardJson[answerType]);
			if(answerType == "message")				result += wrapMessage(cardJson[answerType],'');
			else if(answerType == "image")			result += wrapImage(cardJson[answerType],'card');
			else if(answerType == "title"){
				if(cnt == 0 ){
					cnt++;
					result += "<div name=\"cardSize"+cardCount+"\">";
					result += wrapMessage(cardJson[answerType],'cardTitle');
				}
				else{
					cnt++;
					result += wrapMessage(cardJson[answerType],'cardTitle');					
				}
				if(cnt == contentCnt) result +="</div>";
				//result += wrapMessage(cardJson[answerType],'cardTitle');					
				
			}			
			else if(answerType == "content"){
				if(cnt == 0 ){
					cnt++;
					result += "<div name=\"cardSize"+cardCount+"\">";
					result += wrapMessage(cardJson[answerType],'cardContent');
				}
				else{
					cnt++;
					result += wrapMessage(cardJson[answerType],'cardContent');				
				}
				if(cnt == contentCnt) result +="</div>";
				//result += wrapMessage(cardJson[answerType],'cardContent');				
			}
			else if(answerType == "rending_url")	result += warpLinkUrl(cardJson[answerType],'card');
			else if(answerType == "card_button" || answerType == "card_buttons")	
				result += makeButton(cardJson[answerType]['button'],'card_buttons');
			else if(answerType == "card_drop" || answerType == "card_drop_h")	
				result += makeButton(cardJson[answerType]['button'],'card_drop');
		}
	}
	return result;
}

function wrapCards(cardJson){
	var result = "";
	result += "<div class=\"swiper-container cards\">";
	result += "<div class=\"swiper-wrapper\">";
	for (var cardJsonValue in cardJson){
//		console.log("cardJsonValue : "+cardJsonValue);
//		console.log("cardJson["+cardJsonValue+"] : "+cardJson[cardJsonValue]);
		for (var answerType in cardJson[cardJsonValue]) {
			if (cardJson[cardJsonValue].hasOwnProperty(answerType)) {
				result += "<div class=\"swiper-slide card\">";
//				console.log("answerType : "+answerType);
//				console.log("cardJson["+cardJsonValue+"]["+answerType+"] : "+cardJson[cardJsonValue][answerType]);
				result += wrapCard(cardJson[cardJsonValue][answerType]);
				result += "</div>";
			}
		}
	}
	result += "</div>";
	result += "<div class=\"swiper-pagination\"></div>";
	result += "</div>";
	return result;
}
