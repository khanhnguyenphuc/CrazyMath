var realResult = 0, fakeResult = 0;
var operators = ['<i class="fa fa-plus fa-4x"></i>', '<i class="fa fa-minus fa-4x"></i>', '<i class="fa fa-times fa-4x"></i>', '/'];
var score = 0;
var timeout, timing = 1;
var numberRand1 = 10, numberRand2 = 10;
var startTime;
var self;
var hasAnswer = true;
var playerData = {};
var mymath = {
	// Application Constructor
    initialize: function() {
    	self = this;
    	hasAnswer = false;
    	var d = new Date();
    	if (score != 0 && score % 20 == 0) {
    		numberRand1 += 10;
    		numberRand2 += 10;
    		timing += 1;
    	}
        //random number1
        var number1 = Math.floor((Math.random() * numberRand1) + 1);
        //random number2
        var number2 = Math.floor((Math.random() * numberRand2) + 1);
        //random operator1
        var operator1 = Math.floor((Math.random() * 3) + 1) - 1;
        //get result
        var result = self.calculator(number1, number2, operator1);

		startTime = d.getSeconds();
        //make another result
        $('.number1').text(number1);
        $('.number2').text(number2);
        $('.number3').text(result);
        $('.operator1').html(operators[operator1]);
    },
    calculator: function(num1, num2, operator1) {
    	var result = 0;
    	switch(operator1) {
    		case 0:
    			result = num1 + num2;
    			break;
    		case 1:
    			result = num1 - num2;
    			break;
    		case 2:
    			result = num1 * num2;
    			break;
    		case 3:
    			result = num1 / num2;
    			break;
    	}
    	realResult = result;
    	result = self.randomResult(result);
    	fakeResult = result;
    	return result;
    },
    randomResult: function(result) {
    	var number = Math.floor((Math.random() * 2) + 1);

    	switch(number) {
    		case 1: 
    			var n = Math.floor((Math.random() * 2) + 1);
    			switch(n) {
		    		case 1: 
		    			result += 3;
		    			break;
		    		case 2: 
		    			result -= 2;
		    			break;
    			}
    	}
    	return result;
    },
    confirmCalculator: function(answer) {
    	// self.nextGame();
    	if (answer == (realResult == fakeResult)) {
    		self.nextGame();
    	} else {
    		self.endGame();
    	}
    },
    timingGame: function() {
		timeout = setTimeout(function() {

			var d = new Date();
			var n = d.getSeconds();
			if (n - startTime > 0 && !hasAnswer) {
				self.endGame();
			}
		}, timing * 1000 + 1);
		hasAnswer = false;
    },
    nextGame: function() {

    	score += 1;
		self.playSound('media/notify.mp3');
		hasAnswer = true;
		self.initialize();
		self.showProgress();
		clearTimeout(timeout);
		self.timingGame();
    },
    endGame: function() {

		self.playSound('media/gameover.wav');
		if (score < 1) 
			self.playSound('media/idiot.wav');
		else if (score < 5)
			self.playSound('media/oops.mp3');
        else if (score < 8)
            self.playSound('media/amazing.wav');
		else if (score < 15)
			self.playSound('media/awesome.wav');
        else
            self.playSound('media/impossible.wav');
    	var highScore = localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0;
    	if (highScore < score) highScore = score;
		$('.result-game').fadeIn(1000, 'swing');
		$('.my-math').hide();
		$('.score').text(score);
		$('.highScore').text(highScore);
		$('#my-progress-bar').html('');
		if (typeof(Storage) != "undefined") {
		    // Store
		    localStorage.setItem("highScore", highScore);
		}
		hasAnswer = true;
		score = 0;
        submitScore();
    },
    showProgress: function() {
    	$('#my-progress-bar').html('');
		var line = new ProgressBar.Line('#my-progress-bar', {
			color: '#FCB03C',
			strokeWidth: 3
		});

		line.animate(1, {
			duration: timing * 1000
		});
    },
    playSound: function(src) {
    	var audio = new Audio(src);
    	audio.play();
    }
};
var successfullyLoggedIn = function () {
    googleplaygame.showPlayer(function (_playerData) {
        document.querySelector("#image").src = _playerData.iconImageUrl;
        document.querySelector("#image").style.visibility = 'visible';
        document.querySelector("#feedback").innerHTML = "Hi, " + _playerData.displayName;
        playerData = _playerData;
    });
    $('.btnLogin').hide();
    $('.btnLogout').show();
};
var failedToLogin = function () {
    console.log('failedToLogin');
    // googleplaygame.signOut();
};

var doLoginGPlus = function() {
    googleplaygame.isSignedIn(function (result) {
        if (result.isSignedIn) {
            successfullyLoggedIn();
        } else {
            googleplaygame.auth(successfullyLoggedIn);
        }
    });
};
var submitScore = function() {
    googleplaygame.auth(function () {
        var highScore = localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0;
        var data = {
            score: highScore,
            leaderboardId: 'CggI3OKY2h8QAhAC'
        };
        googleplaygame.submitScore(data);
    }, failedToLogin);
};
function sharePhoto() {
     var imageLink;
            console.log('Calling from CapturePhoto');
            navigator.screenshot.save(function(error,res){
            if(error){
            console.error(error);
            }else{
            console.log('ok',res.filePath); //should be path/to/myScreenshot.jpg
            //For android
            imageLink = res.filePath;
           window.plugins.socialsharing.share('Message, subject, image and link', 'The subject','file://'+imageLink, 'http://www.x-services.nl');

           //For iOS
           //window.plugins.socialsharing.share(null,   null,imageLink, null)
     }
     },'jpg',50,'myScreenShot');
}
$(function () {
	
	$('.start-game').click(function(e) {
		mymath.initialize();
		$('.home').hide();
		$('.my-math').show();
		$('.result-game').hide();
	});
	$('.back-menu').click(function(e) {
		$('.home').show();
		$('.result-game').hide();
	})
	$('.accept').click(function(e) {
		mymath.confirmCalculator(true)
	});
	$('.deny').click(function(e) {
		mymath.confirmCalculator(false)
	});
    // $('.btnLogin').click(function(e) {
    //   doLoginGPlus();
    // });
    // $('.btnLogout').click(function(e) {
    //     googleplaygame.signOut();
    //     $('.btnLogin').show();
    //     $(this).hide();
    //     document.querySelector("#image").style.visibility = 'hidden';
    //     document.querySelector("#feedback").innerHTML = '';
    // });
    $('.leaderboard-game').click(function(e) {
        googleplaygame.showLeaderboard({
            leaderboardId: 'CggI3OKY2h8QAhAC'
        });
    });
    $('.achievement-game').click(function(e) {
        googleplaygame.showAchievements();
    });
});