// function that executes at page load
$(document).ready(function() {

	// when the START button is clicked...
	$('#start-button').on('click',function() {
		// remove the start button
		$('#start-button').remove();
		// fire up the first trivia question
		nextQuestion('initial');
	});
});