// function definitions

// clears previous question, displays appropriate feedback, loads next question, ends game
function nextQuestion(response) {

	// initial case: start of game
	if (response === 'initial') {
		displayQuestion();
		return;
	}

	// clear the timer interval and remove the timer div
	window.clearInterval(qInterval);
	$('#time-remaining').remove();

	// clear out the previous question
	clearQuestion();					

	// display feedback
	displayFeedback(response);

	// if not at the end of the game, display next question, otherwise end the game
	if (qIndex < numQuestions) {
		window.setTimeout(function() { displayQuestion(); },2000);
	}
	else {
		window.setTimeout(function() { endGame(); },2000);
	}

	function displayQuestion() {
		// clear out the feedback
		$('#feedback').remove();
		$('#feedback-image').remove();
		// start the timer for the question
		startTimer();
		// create a question div
		var question = $("<div id='question'></div>");
		// insert the question into question div
		question.text(trivia[qIndex].question);
		// append the question to the content area
		$('#content-area').append(question);
		// create, insert, and append the answer divs
		for (let i = 1; i <= numChoices; i++) {
			var answer = $("<div id='answer'" + i.toString() + " class='answer'></div>");
			answer.text(trivia[qIndex].answers[i-1]);
			$('#content-area').append(answer);
		}
		// listen to the response from the user
		listenToAnswers();
	}

	function clearQuestion() {
		// remove the question
		$('#question').remove();

		// remove the answer choices
		$('.answer').remove();
	}

	function displayFeedback(response) {

		// create the feedback divs
		var feedback = $("<div id='feedback'></div>");
		var feedback_image = $("<image id='feedback-image'></image>");

		// populate the proper feedback based on what the user selected
		if (response === 'correct') {
			numCorrect++;
			qIndex++;
			feedback.text('Congratulations, right answer!');
			feedback_image.attr('src','assets/images/success.png');
		}
		else if (response === 'wrong') {
			numWrong++;
			qIndex++;
			feedback.text('Wrong answer, better luck next time.');
			feedback_image.attr('src','assets/images/failure.png');
		}
		else {
			numTimedOut++;
			qIndex++;
			feedback.text('Sorry, you\'re out of time!');
			feedback_image.attr('src','assets/images/timesup.png');
		}

		// display the feedback on screen!
		$('#content-area').append(feedback);
		$('#content-area').append(feedback_image);

	}

	function endGame() {
		// clear out the feedback
		$('#feedback').remove();
		$('#feedback-image').remove();

		// create table to store results			
		var table = $($.parseHTML(
		`<table>
			<tr>
				<td class='label'># Correct</td>
				<td id='numcorrect'></td>
			</tr>
			<tr>
				<td class='label'># Wrong</td>
				<td id='numwrong'></td>
			</tr>
			<tr>
				<td class='label'># Timed Out</td>
				<td id='numtimedout'></td>
		</table>`
		));

		// display the overall score and table
		var overallScore = $("<div id='overall-score' />").text("Overall score: " + 
			Math.round(numCorrect/numQuestions*100) + "%");
		$('#content-area').append(overallScore);
		$('#content-area').append(table);

		// compute the results
		$('#numcorrect').text(numCorrect);
		$('#numwrong').text(numWrong);
		$('#numtimedout').text(numTimedOut);

		// display the restart button
		var restartButton = $($.parseHTML(`<button type="button" class="btn btn-primary 
			btn-lg" id="restart-button">Restart Game</button>`));
		$('#content-area').append(restartButton);

		// when the RESTART button is clicked...
		$('#restart-button').on('click',function() {
			// reset globals
			numCorrect = 0;
			numWrong = 0;
			numTimedOut = 0;
			qIndex = 0;
			// remove the endgame report
			$('table').remove();
			$('#overall-score').remove();
			$('#restart-button').remove();
			// fire up the first trivia question
			nextQuestion('initial');
		}); // end of restart click function

	}; // end endgame function
}; // end next question function

// starts the question timer
function startTimer() {
	// reset the value for number of seconds left in timer
	numSeconds = 15;

	// create the timer div and append it to content area
	var timer = $("<div id='time-remaining'></div>");
	timer.text("Time Remaining: " + numSeconds + " seconds");
	$('#content-area').append(timer);

	// decrement the timer
	qInterval = window.setInterval(function() {
		if (numSeconds === 1) { // if timer has run out
			$('#time-remaining').text("Time Remaining: " + 0 + " seconds"); // display 0 seconds left
			console.log('Sorry, time has run out');
			numSeconds = 15;
			nextQuestion('timeout'); // display the next question
		}
		else {
			numSeconds--;
			$('#time-remaining').text("Time Remaining: " + numSeconds + " seconds");
		}
	},1000); // 1 second delay
};

// listens to answer responses
function listenToAnswers() {

		$('.answer').on('click', function(event) {

		// if correct answer display correct answer feedback
		if (event.target.textContent === trivia[qIndex].correctAnswer.toString()) {
			nextQuestion('correct');
		}
		else { // otherwise display wrong answer feedback
			nextQuestion('wrong');
		}

	});
}