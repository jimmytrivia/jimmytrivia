// Created by John Bendfeldt @jimmymenutrivia@gmail.com
$(document).ready(function () {
	// Variables that I need
    var correct = 0;
		wrong = 0;
		noanswer = 0;
		question = 0;
		timer = 15;
		$('.restart').hide();
		$('.reset').hide();
	//Function to start game
	function setupGame() {
		$('.timeLeft').hide();
		$('.question').hide();
		$('.options').hide();
		$('.result').hide();
		$('.restart').hide();
		$('.reset').hide();
		$('.directions').show();
	};
	//Establish start button behavior
	$('.start').on('click', function(startGame) {
		$('.timeLeft').show();
		$('.question').show();
		$('.options').show();
		$('.result').show();
		$('.restart').show();
		$('.reset').show();
		$('.start').hide();
		$('.directions').hide();
		showQuestion();
	});
	var canChoose = true;
	//Showing the question
	function showQuestion(){
		canChoose = true;
		$('.result').html('');
		startTimer();
		var obj = questions[question];
		
		var qText = obj.q_text;
		$('.question').html(qText);
		
		var qAnswers = [obj.q_options_1, obj.q_options_2, obj.q_options_3, obj.q_options_4]
		$('.options').html('');
		for (var i = 0; i < qAnswers.length; i++) {
			var ans = qAnswers[i];
			var id = i + 1;
			var first = '<li id="'+id+'">'
			var last = '</li>'
			$('.options').append(first+ans+last);
		}

		for (var j = 1; j <= 4; j++) {
			$('#'+j).click(function(){
				showAnswer($(this).attr('id'));
			});
		}

	}
	//Shows the answer
	function showAnswer(num) {
		stopTimer();
		if(!canChoose) {
			return
		}
		timer = 15;
		var count = question;
		var obj = questions[count];
		var objCorrect = obj.q_correct_option
		if (num == 0){
			noanswer++
			$('.result').html('Please Answer the Questions');
		} else if (num == objCorrect) {
			correct++
			$('.result').html('Correct!');
		} else {
			wrong++
			$('.result').html('Incorrect!');
			$('#'+num).addClass('wrong');
		}
		$('#'+objCorrect).addClass('correct');
		$('.result').append('<br> Correct: ' + correct + '<br>');
		$('.result').append('Wrong: ' + wrong + '<br>');
		$('.result').append('Missed: ' + noanswer);
		question++
		if (question < 15) {
			setTimeout(showQuestion, 2000);
		} else {
			setTimeout(gameOver);
		} 
		canChoose = false;
	}
    //Establish timer for each question
    function startTimer(){
		timer = 15;
		$('.timeLeft').html('Time Remaining: ' + timer + ' seconds');
		counter = setInterval(runTimer, 1000);
    }
    // run the timer
    function runTimer(){
    	
    	// remove a second
		timer--

		// display timer
		$('.timeLeft').html('Time Remaining: ' + timer + ' seconds');
		
		// you ran out of time
		if (timer === 0){

			// stop the counter from going negative
			stopTimer();

			// show answer and mark no answer
			showAnswer(0);
		}
    }
    // stop counting down
    function stopTimer(){
		clearInterval(counter);
    }

    //Establishes a restart buttom
    $('.restart').on('click', restart);
	// Restart
	function restart() {
		stopTimer();
		$('.start').show();
		correct = 0;
		wrong = 0;
		noanswer = 0;
		question = 0;
		timer = 15;
		setupGame();
	}
	
	function gameOver() {
		
		$('.options').html('Hit Restart if you want to try again!');
		$('.question').html('');
		$('.result').html('<br> Correct: ' + correct + '<br>');
		$('.result').append('Wrong: ' + wrong + '<br>');
		$('.result').append('Missed: ' + noanswer);

		if (correct == 15) {
			$('.timeLeft').html('You are a Menu Master!');
		} else if (correct > wrong) {
			$('.timeLeft').html('Almost! See if you can get them all correct.');
		} else if (noanswer == 15) {
			$('.timeLeft').html('Do you even care?');
		} else if (wrong > correct) {
			$('.timeLeft').html('Sad! Try again.');
		} else if (wrong == correct) {
			$('.timeLeft').html('You should keep studying the menu.');
		} else {
			$('.timeLeft').html('Thanks for trying!');
		}
		$('.restart').on('click', restart);
	}

});
	//Establish questions
	function question(number, text, opt1, opt2, opt3, opt4, ans) {
		this.id = number;
		this.q_text = text;
		this.q_options_1 = opt1;
		this.q_options_2 = opt2;
		this.q_options_3 = opt3;
		this.q_options_4 = opt4;
		this.q_correct_option = ans;
	};

	var question1 = new question (
		1,
		'1. What makes Slims unique?',
		'They are smaller.',
		'They have only meats or cheese, no veggies or sauce.',
		'They get less mayo.',
		'They get extra veggies.',
		2
	)

	var question2 = new question (
		2,
		'2. Which subs and clubs have lettuce and tomato?',
		'All of them.',
		'All but the ones with tuna.',
		'The clubs only.',
		'The subs only.',
		1
	)

	var question3 = new question (
		3,
		'3. Which sandwiches have no mayo?',
		'The 3, 5 and 15.',
		'The 2, 3, 4, 14, 16 and 17.',
		'The 6 and 13.',
		'The Gargantuan.',
		1
	)

	var question4 = new question (
		4,
		'4. Which sandwiches get Onions, Herbs and Sauce?',
		'The ones with Cheese.',
		'The ones with Tuna.',
		'The Billy Club and the Ultimate Porker.',
		'The ones with Vito.',
		4
	)

	var question5 = new question (
		5,
		'5. What comes on the #8?',
		'Mayo, tomato, lettuce, Bacon and Ham.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Beef, Dijon, Ham and Cheese.',
		'Mayo, tomato, lettuce, Beef, more Beef and Cheese.',
		3
	)

	var question6 = new question (
		6,
		'6. How many pieces of bacon do we put as a portion?',
		'4.',
		'Enough to cover the sandwich.',
		'6.',
		'5.',
		4
	)

	var question7 = new question (
		7,
		'7. What comes on a #14?',
		'Mayo, tomato, lettuce, Turkey and Bacon.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Beef, Dijon, Ham and Cheese.',
		'Mayo, tomato, lettuce, Ham and Bacon.',
		2
	)

	var question8 = new question (
		8,
		'8. What comes on the #10?',
		'Mayo, tomato, lettuce, Bacon and Ham.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Beef, Dijon, Ham and Cheese.',
		'Mayo, tomato, lettuce, Beef, more Beef and Cheese.',
		4
	)

	var question9 = new question (
		9,
		'9. What comes on the #17?',
		'Mayo, tomato, lettuce, Bacon and Ham.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Beef, Dijon, Ham and Cheese.',
		'Mayo, tomato, lettuce, Beef, more Beef and Cheese.',
		1
	)

	var question10 = new question (
		10,
		'10. Which sandwiches have Avo spread on them?',
		'The 5 and 9.',
		'The 6, 12 and 13.',
		'The 3 and 15.',
		'The 16 and 17.',
		2
	)

	var question11 = new question (
		11,
		'11. What comes on the #12?',
		'Mayo, tomato, lettuce, Bacon and Ham.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Turkey, Cheese, Avo and Cheese.',
		'Mayo, tomato, lettuce, Beef, more Beef and Cheese.',
		3
	)

	var question12 = new question (
		12,
		'12. What comes on the #9?',
		'Mayo, tomato, onions, lettuce, sauce, herbs, Vito, Ham and Cheese.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Beef, Dijon, Ham and Cheese.',
		'Mayo, tomato, lettuce, Beef, more Beef and Cheese.',
		1
	)

	var question13 = new question (
		13,
		'13. What comes on the #11?',
		'Mayo, tomato, lettuce, Bacon and Ham.',
		'Mayo, tomato, lettuce, Beef and Turkey.',
		'Mayo, tomato, lettuce, Beef, Dijon, Ham and Cheese.',
		'Mayo, tomato, lettuce, Turkey, Ham and Cheese.',
		4
	)

	var question14 = new question (
		14,
		'14. What comes on the #16?',
		'Mayo, tomato, lettuce, Bacon and Ham.',
		'Mayo, tomato, lettuce, Bacon and Turkey.',
		'Mayo, tomato, lettuce, Turkey, Ham and Cheese.',
		'Mayo, tomato, lettuce, Beef, more Beef and Cheese.',
		2
	)

	var question15 = new question (
		15,
		'15. Which sandwiches have cucumbers?',
		'Sandwiches with Tuna.',
		'Sandwiches with Avo.',
		'The 3, 6, 12, 13 and 15.',
		'All of the above.',
		4
	)
	var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15]
