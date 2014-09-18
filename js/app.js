//Array to store input values
	var inputArray = [];
	

	// var prevGuess = inputArray.length;

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
  		console.log(compNum);
  		//allows the number to be used as global variable
  		gameNum = compNum;
  		return compNum;
  	} 

	//Randomizes number on refresh
	randomNum();

	
	/***********************
  		GUESS / VALIDATE
  	************************/

  	//Guess Value
  	$("#guessButton").on("click", function(event){
  		//variable for the users guess
  		var guessValue = $("#userGuess").val();
  		//Prevents page refresh on clicking the button
		event.preventDefault();
		//on click run the guess function
		guess(guessValue);


		//push the inputs into an array
		inputArray.push(guessValue);
		
		/***********************
  				COUNTER
  		************************/

		//count length of the list itmes to show times guessed
		var count = $("#guessList li").length;
		 $("#count").text(count);
		 //Clears the input textbox for next guess
		 $("#userGuess").val("");


	});//end of click guess button functionality

	

	
	function guess(guessValue){
		/*Distance from the guessed value*/
		var distanceFrom = Math.abs(guessValue - gameNum);

		//Get's the previous value enterd
		var previousValue = inputArray[inputArray.length - 1];
		 

		//Distance from correct number for the previous guess
		var distancePrevious = Math.abs(previousValue - gameNum);

		/***********************
			FEEDBACK
		************************/

		//Validates the input to make sure is a whole number between 1 and 100
		if(guessValue > 0 && guessValue <= 100 && guessValue % 1 === 0 && !isNaN(guessValue)){
			//Appends a list item with the user guess value
			$("#guessList").prepend("<li>" + guessValue);

				//If statement for options only on first guess
				if(inputArray.length === 0){
					
					//If user guesses correct
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
						$("#feedback").text("Your Boiling");
					};//end of if statement for responses on first guess

				}else{//on every other guess but the first added feedback provided to user
					
					if(+guessValue === +gameNum){
						$("#feedback").text("Well Done You Guessed Correct.  Please Start a New Game");
						//Prevent user from entering more values
						$("#userGuess").prop("disabled", true);
						$("#guessButton").prop("disabled", true);
					}else if(+distanceFrom >= 50){
						if(distancePrevious > distanceFrom){
							$("#feedback").text("Your Freezing, But Getting Warmer");
						}else{
							$("#feedback").text("Your Freezing, And Getting Colder");
						};
					}else if(+distanceFrom >= 40){
						if(distancePrevious > distanceFrom){
							$("#feedback").text("Your Really Cold, But Getting Warmer");
						}else{
							$("#feedback").text("Your Really Cold, And Getting Colder");
						};
					}else if(+distanceFrom >= 30){
						if(distancePrevious > distanceFrom){
							$("#feedback").text("Your Cold, But Getting Warmer");
						}else{
							$("#feedback").text("Your Cold, And Getting Colder");
						};
					}else if(+distanceFrom >= 20){
						if(distancePrevious > distanceFrom){
							$("#feedback").text("Your Warm, But Geting Warmer");
						}else{
							$("#feedback").text("Your Warm, But Geting Colder");
						};	
					}else if(+distanceFrom >= 5){
						if(distancePrevious > distanceFrom){
							$("#feedback").text("Your Hot, And Getting Hotter");
						}else{
							$("#feedback").text("Your Hot, But Cooling Down");
						};	
					}else if(+distanceFrom < 5 ){
						if(distancePrevious > distanceFrom){
							$("#feedback").text("Your Boiling, And Now Its Unbareable");
						}else{
							$("#feedback").text("Your Boiling, But Now There's A Slight Breeze");
						};	
					}


				};//end of if/else statement to differentiate between first and all other guesses
				
				
		}else{
			//Alert user to correct their input
			$("#feedback").text("Please choose a whole number between 1 and 100");
		}//end of validate if statement

	};//end of guess function


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


