Program execution

1) User clicks start button to begin the game
2) Display first question and 4 answer choices
3) Begin countdown of timer
4) If...
	User clicks correct answer choice
	-> Display congratulations screen, increment correct answer variable
	User clicks wrong answer choice
	-> Display wrong answer screen, increment wrong answer variable
	User doesn't click an answer choice in time
	-> Display time out screen, incremement time out variable
5) Create a time delay, then move on to the next question
6) Repeat steps 2-5 until questions are exhausted
7) Display game summary screen showing correct, incorrect, timed out answers
8) Offer user the option of restarting the game

-------

Data

Trivia object: Contains trivia questions, answer choices, and correct answer choice


-------

Global variables

numCorrect: Number of correct answer choices that the user has selected
numWrong: Number of incorrect answer choices that the user has selected
numTimeOut: Number of questions where the user ran out of time
numDisplayed: Number of quesitons that have been displayed to the user
numQuestions: Number of questions in the trivia game
questionIndex: Current question that is being displayed


