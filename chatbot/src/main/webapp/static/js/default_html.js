//화면 요소 Data
var API_URL = "http://211.39.140.249:7580/api";
var IMGSRV_URL = "http://211.39.140.249:7080/sample/image/";
var projectId = "84e56ec7708a";
var profileImg = "http://211.39.148.249:7080/sample/image/KTDS_icn.png";
var chatbot_name = "";
var chatbot_name2 = "";
var refreshMsg =
  "1시간 동안 대화가 없어서 챗봇이 쉬고 있어요😴<br>챗봇과 더 대화하고 싶다면 새로고침을 눌러주세요!";

var ERROR_MESSAGE =
  "죄송합니다. 문의하신 내용을 찾는데 문제가 발생했습니다.<br>잠시 후 다시 질문부탁드립니다.";
var DEFAULT_BOTTOM_ANSWER = "아래에 버튼을 선택해주세요.";
var QUESTION_TOP_HTML = [
  "<div class='box_wrap'>",
  "<ul class='question_box'>",
  "<li class='question'>",
].join("");
var QUESTION_BOTTOM_HTML = [
  "</li>",
  "<li class='time'></li>",
  "</ul>",
  "</div>",
].join("");
var ANSWER_TOP_HTML = [
  "<div class='box_wrap'>",
  "<ul class='answer_box'>",
  "<li class='name'><img src='" +
    profileImg +
    "' alt='' onclick='javascript:oneWayQuery(1)'/></li>",
  "<li class='subname'>" + chatbot_name + "</li>",
  "<li class='answer'>",
].join("");
var ANSWER_BOTTOM_HTML = [
  "</li>",
  "<li class='time'></li>",
  "</ul>",
  "</div>",
].join("");
var LOADING_HTML = [
  "<div class='box_wrap' id='loading'>",
  "<ul class='answer_box'>",
  "<li class='name'><img src='" + profileImg + "' alt=''/></li>",
  "<li class='answer'>",
  "<div class='three-balls'>",
  "<div class='ball ball1'></div>",
  "<div class='ball ball2'></div>",
  "<div class='ball ball3'></div>",
  "</div>",
  "</li>",
  "</ul>",
  "</div>",
].join("");
var REFRESH_MESSAGE =
  '{  "message": "' +
  refreshMsg +
  '",  "buttons": {  "type": "refresh",  "button": [  {  "buttonname": "새로고침"  }  ]  },  "image": {  "url": "http://answerny.ai/chatbot/projects/mju/image/END.png",  "width": "230px"  } }';
