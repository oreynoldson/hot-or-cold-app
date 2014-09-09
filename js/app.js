
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});//End of display modal

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	}); //End of hide modal

  	/***********************
  	START GAME - RANDOM NUMBER
  	************************/

  	/*--- Choose random number between 1 and 100 ---*/
  	var randomNum = function(){
  		var compNum = Math.floor(Math.random() * 100) + 1;
  		//Allow to view number in console
  		// console.log(compNum);
  		//allows the number to be used as global variable
  		gameNum = compNum;
  		return compNum;
  	} 

	//Randomizes number on refresh
	randomNum();

	/***********************
  	ADD TO LIST / VALIDATE
  	************************/

	//append value to guess list
	$("#guessButton").on("click", function(event){
		//variable for the users guess
		var guessValue = $("#userGuess").val();
		//Prevents page refresh on clicking the button
		event.preventDefault();
		//Validates the input to make sure is a whole number between 2 and 100
		if(guessValue > 0 && guessValue <= 100 && guessValue % 1 === 0 && !isNaN(guessValue)){
			//Appends a list item witht the user guess value
			$("#guessList").prepend("<li>" + guessValue);
		}else{
			//Alert user to correct their input
			alert("Please choose a whole number between 1 and 100");
		}


		/***********************
  				FEEDBACK
  		************************/

		/*Distance from the guessed value*/
		var distanceFrom = Math.abs(guessValue - gameNum);
		//Feedback based on how far off random number
		if(+guessValue === +gameNum){
			$("#feedback").text("Well Done You Guessed Correct.  Please Start a New Game");
			//Prevent user from entering more values
			$("#userGuess").prop("disabled", true);
			$("#guessButton").prop("disabled", true);
		}else if(+distanceFrom >= 50){
			$("#feedback").text("Your Freezing");
		}else if(+distanceFrom >= 40){
			$("#feedback").text("Your Really Cold");
		}else if(+distanceFrom >= 30){
			$("#feedback").text("Your Cold");
		}else if(+distanceFrom >= 20){
			$("#feedback").text("Your Warm");
		}else if(+distanceFrom >= 5){
			$("#feedback").text("Your Hot");
		}else if(+distanceFrom < 5 ){
			$("#feedback").text("Your Boiling")
		}


		/***********************
  				COUNTER
  		************************/

		//count lenght of the list itmes to show times guessed
		var count = $("#guessList li").length
		$("#count").text(count);
		//Clears the input textbox for next guess
		$("#userGuess").val("")
		//Add one to the guess counter
		});

		/***********************
  			NEW GAME RESETS
  		************************/

	//New Game Resets
	$(".new").on("click", function(){
		randomNum();
		$("#guessList").empty();
		$("#count").text("0");	
		$("#userGuess").prop("disabled", false);
		$("#guessButton").prop("disabled", false);
		$("#feedback").text("Make your Guess!")
	});	
		
});// End of doc ready
