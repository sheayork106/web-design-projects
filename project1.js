/* WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!!
    This is an old version of my Javascript. I didn't like how messy it was, so I wanted
    to retype it and clean it up some. I wanted to keep my notes in case I missed something important.
*/



//This is all the initial stuff I wanted to make sure Javascript was working in the first place
'use strict';
console.log('working');

//This goes ahead and randomly selects a number. If the secret number, by any chance, equals 0,
//      it's randomly generated again. I had this happen to me once and just want to make sure it doesn't happen
//      again. This probably could have been handled in a better way, but I wasn't for sure how.

let secret_number = Math.floor(Math.random() * 100);
if (secret_number == 0){
    while (secret_number == 0){
        secret_number = Math.floor(Math.random() * 100);
    }
}
//This just lets the user know it's been selected. This will repeat if the user plays again
console.log('secret number has been selected');
//FIXME: Secret number can still be 0 --- done! (9/20/2021)

//Collecting all the elements from the HTML I need: the user's number, the guess button, the round number paragraph, and
//      the alert paragraph
let main_content = document.querySelector('#main-content');
let guess = document.querySelector('#user-num');
let button = document.querySelector('#my-button');
let round = document.querySelector('#round');
let alert = document.querySelector('#alert');

//This is just bonus material - I went ahead and set the turn equal to 1 because the user has to take at least one turn.
//  Then the list is just there so it keeps track of all the numbers that get generated. I went ahead and added the first one by default.
let turns = 1;
let secretNumsGenerated = [];
secretNumsGenerated.push(secret_number);

//going ahead and making the round number equal 1 by default. I don't know for sure what else I would do for this other than make a function,
//  but I don't think this deserves a function.
let i = 1;
alert.innerHTML = "Hmm...I'm thinking of a number<br>between 1 and 100...";
round.innerHTML = `<b><u>Round ${i}</u></b>`;

//Asks the website whether the button has been clicked or not
button.addEventListener('click', function(event){
    //This checks and makes sure the data type can be converted into a number. If it isn't, that must be it's a non-numeric character, which
    //  is dealt with in the else statement
    //I liked in the example how the value was shown to the user every time the button was clicked, so I adapted it here.
    //  I couldn't tell if sometimes I did press the button and JS acknowledged that, or if my program was taking a while to process it.
    if (Number(guess.value)){
        //Checking if the range is between 1 and 100 first. If it isn't, I tell the user and add 1 to the turns variable.
        if ((Number(guess.value) < 1) || Number(guess.value) > 100) {
            alert.innerHTML = `${guess.value} is out of range, please try again.`;
            turns += 1;
        }
        //If that first if doesn't work, then the rest of these statements should be checked.
        //If it's too low, I tell the user and add 1 to the turns variable
        else if (Number(guess.value) < secret_number) {
            alert.innerHTML = `${guess.value} is too low, please try again.`;
            turns += 1;
        }
        //If it's too high, I let them know and add 1 to turns
        else if (Number(guess.value) > secret_number) {
            alert.innerHTML = `${guess.value} is too high, please try again.`;
            turns += 1;
        }
        //If the number is exactly equal to 0, then I let the user know and tell them how many turns it took them
        //By default, my program goes ahead and selects another random number. I let the user know that in the message as well
        //The round number is added by 1 every single time, and the secret number is added to the list. I also tell the user
        //  for sure if the number got selected again. Finally, I make the turns equal to 1 again.
        else{
            alert.innerHTML = `You got it! The secret number was ${secret_number} c:<br>It took you ${turns} turns to get it.`;
            main_content.insertAdjacentHTML('beforeend', `<button id='again'>Play Again?</button`);
            //I decided to only have the button pop up after one round
            //If the button is clicked, a new number will be generated, the alert class will be assigned the thinking
            //  part again, and the round number and the secret numbers will be updated 
            let play_again = document.querySelector('#again');
            play_again.addEventListener('click', function(event){
                alert.innerHTML = "Hmm...I'm thinking of a number<br>between 1 and 100...";
                secret_number = Math.floor(Math.random() * 100);
            });
            /*turns = 1;
            i += 1;
            round.innerHTML = `<b><u>Round ${i}</u></b>`;
            secret_number = Math.floor(Math.random() * 100);
            console.log('secret number has been selected');
            secretNumsGenerated.push(secret_number);*/
        }
    }
    //If Number(guess.value) is not true, I tell the user that it isn't one and automatically add 1 to the turn since I feel that counts here
    else {
        alert.innerHTML = `'${guess.value}' is not a number, please try again.`;
        turns += 1;
    }
});