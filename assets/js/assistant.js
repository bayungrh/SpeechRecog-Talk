var search_E = "bing.com";

$(document).ready(function() {
	$('button[data-type=btn-talk]').on('click', function() {
		startSpeech();
	});
});

function startSpeech() {
	var $TalkText = $('input[data-type=talktext]');
	$("#audio")[0].play();
  	$TalkText.val('');
    $TalkText.attr("placeholder", "Listening...");
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
	      var recognition = new webkitSpeechRecognition();
	      recognition.continuous = false;
	      recognition.interimResults = false;
	      //recognition.lang = "id-ID";
	      recognition.lang = "en-US";
	      recognition.start();

	    recognition.onresult = function(e) {
	        $TalkText.val(e.results[0][0].transcript);
	        var talk = $TalkText.val();
	        CekCommand(talk);
	        recognition.stop();
	    };
	    recognition.onerror = function(e) {
	        recognition.stop();
    	};
    }
}

function Thinking(kata) {
	var text = kata.toLowerCase(), res;
    var pattern = [
    	//-------------------- TALK
    		{ tanya:"what is your name", jawab:"I'm Jugem" }, 
    		{ tanya:"your name", jawab:"Hello human, i'm Jugem" }, 
	    	{ tanya:"who are you", jawab:"I'm Jugem, your personal Assistant" },
	    	{ tanya:"when you born", jawab:"I was born at Indonesia and my chief is Bayu"},
	    	{ tanya:"you have a gender", jawab:"no, because i just a program."},
	    	{ tanya:"how are you", jawab:"Great, thanks." },
	    	{ tanya:"how are you today", jawab:"Great, thanks." }, 
    		{ tanya:"hello", jawab:"Hi there"},
    		{ tanya:"hello jarvis", jawab:"Hello, can i help you?"},
    		{ tanya:"hi", jawab:"Hi there"},
    		{ tanya:"can you help me", jawab:"Yes, sir"},
    		{ tanya:"cortana", jawab:"Nope, i'm not Cortana"},
    		{ tanya:"hey cortana", jawab:"Nope, i'm not cortana"},
    		{ tanya:"ok google", jawab:"Google is okay, but this is not google"},
    		{ tanya:"google", jawab:"Google? Nope, this is not google"},
    		{ tanya:"that's cool", jawab:"Thank you very much"},
    		{ tanya:"that's cool bro", jawab:"Thank a lot"},
    		{ tanya:"who am i", jawab:"You are my friend"},
    		{ tanya:"f*** you", jawab:"Fuck you too" },
    		{ tanya:"thank you", jawab:"You're welcome" },
    		{ tanya:"thank you very much", jawab:"You're welcome" },
    		{ tanya:"who is your chief", jawab:"Bayu"},
    		{ tanya:"do you have a girlfriend", jawab:"No, because i'm Programmer"},
    		{ tanya:"you have a girlfriend", jawab:"No, because i'm Programmer"},
    		{ tanya:"what are you doing", jawab:"Talk with you"},
    		{ tanya:"your age", jawab:"I don't really have an age like humans, but I have a birthday. Are you planning on getting me something"},
    		{ tanya:"you have a wife", jawab:"My waifu is Shirayuki"},
    		{ tanya:"do you have a wife", jawab:"My waifu is Shirayuki"}
    ];
	$.each(pattern, function(key, val) {
		if(val.tanya == text) {
			return typed(val.jawab);
		}
	}); return typed("i dont understand");
}

function getTime() {
	var d = new Date(),
		waktu = d.getHours() + ':' + d.getMinutes(),
		ampm = (d.getHours() >= 12) ? "PM" : "AM";
	return waktu + " " + ampm;
}
function changeSearchEngine(engine) {
	search_E = $(engine).val() + ".com";
}
function CekCommand(text) {
	text = text.toLowerCase();
	if(text.indexOf("open") > -1 && text.indexOf(".") > -1) {
		var subStr = text.match("open(.*)")[1].trim();
		window.open("http://" + subStr, '_blank');
		return typed("opening " + subStr);
	} else if(text.indexOf("search") > -1) {
		var subStr = text.match("search(.*)")[1].trim();
		window.open("http://" + search_E + "/?q=" + subStr,'_blank','modal=yes');
		return typed("Searching '" + subStr + "' with " + search_E );
	}	
	switch(text.toLowerCase()) {
		case 'what time':
			return typed(getTime());
			break;
		default:
			return Thinking(text);
			break
	}
}
function typed(text) {
	$("#result").typed({
	    strings: [text + '.'],
	    typeSpeed: 15
	});
	return Speak2(text);
}
function configureRPVoice() {
	responsiveVoice.setDefaultVoice("US English Female");
}
function configureTalkify() {
	  talkifyConfig = {
	      host: 'http://talkify.net', //Host of streamed audio media.
	      forceLanguage:'en-US',
	      ui: {
	      	audioControls: { //If enabled, replaces the built in audio controls. Especially good for the Web Speech API bits
	        	enabled: false,
	            forceLanguage:'en-US',
	            container: document.body
	        }
	      }
	  }
}

function Speak1(text) {
	configureTalkify();
  	var player = new TtsPlayer(); //or new Html5Player()
  	player.playText(text);
}
function Speak2(text) {
	configureRPVoice();
	responsiveVoice.speak(text);
	responsiveVoice.stop();
}