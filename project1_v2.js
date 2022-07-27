//This is all the initial stuff I wanted to make sure Javascript was working in the first place
'use strict';
console.log('working');

/*Going ahead and grabbing all the elemnts I will need for my code
    . Main-content - I will use this to add the 'Play again' button every single time the user wins
    . User_num - I need to get the user's number, and the best way to do that is to get it
    . Button - Need an event listener to check if the user is making a guess
    . Alert - Will reassign the innerHTML whether the user guessed it right or not, depending on the circumstance
*/
let main_content = document.querySelector('#main-content');
let user_num = document.querySelector('#user-num');
let button = document.querySelector('#my-button');
let round = document.querySelector('#round');
let alert = document.querySelector('#alert');

/*PART 3 --- Bonus variables
    Went ahead and put this after my functions
        . Need to keep track of turns ---
        . Update the round number (especially if played again) ---
        . Keep track of the secret numbers ---
            *Not for sure if I should allow the user to look at them so far or not
*/
let turns = 1;
let secretNums = [];
let roundNum = 1;

//I don't know a lot about HTML yet, so for formatting purposes, had to put some of the sentence on the next lien
//Regardless, these two will be set up by default. 
alert.innerHTML = "Hmm...I'm thinking of a number<br>between 1 and 100...";
round.innerHTML = `<b><u>Round ${roundNum}</u></b>`;

/*PART ONE --- Number Game Basics
    . Generate a random number --- DONE
    . Ask the user for a number and be able to get it --- DONE
    . Have a clickable button to check the input --- DONE
        *If not guessed, let user know if it's too high, too low, or
            not a number --- DONE
        *If guessed, let them know and congradulate them! Also say how many turns it took
            and remind them what the number was ---DONE
            *Try to clear the text box, if possible ---
*/

/*PART TWO --- Play again?
    . After it's done, ask if they want to play again. If they do, start over. --- DONE
    . Keep track of if the game is over (maybe disable the guess button unless play again is selected?)
*/


/*Randomly generating the secret number
    I decided to make this a function because my last version of my JS, I had to call it over and over
        again, and I didn't really like that.
    There was one case that my secret number was 0 for some reason, so I wanted to make sure
        if it happened again, the secret number would be changed until it equals something other than 0
*/
function secret_num() {
    let secret_number = Math.floor(Math.random() * 100);
    //Making sure if it's 0, it gets reassigned until it's not
    if (secret_number === 0) {
        while (secret_number === 0) {
            secret_number = Math.floor(Math.random() * 100);
        };
    };
    //this will print, but I have to end with return because if I don't, then I will get 'undefined'
    console.log('Secret number has been selected!');
    secretNums.push(secret_number);
    return(secret_number);
};

/*Get the value from the button
    For this, I want to be able to tell when the user makes a guess. The only case
        I really need to look out for that is if my-button is pressed, which is where button comes into play.
    I saw every time the user puts in a value, that value gets stored to user-num.value, so I decided to make
        a variable called 'guess' and make it equal to user-num's value. 
    I also decided to make the function, secret_num() equal to a variable just so it doesn't generate a new number
        every single time. At least, that's what I'm sure would happen.
    Main parts to ask
        *Is the number in range?
        *Is the number even a number?
        *Is the number higher than secret number?
        *Is the number lower than secret number?
*/

let secret_number = secret_num();

button.addEventListener('click', function(event){
    let guess = user_num.value;
    //The weirdest thing is, if guess is equal to 0, it claims it isn't a number. 
    //  I don't know why this doesn't work in that case, but I guess it doesn't matter
    //  that much for this problem.
    if (Number(guess)){
        guess = Number(guess);
        if ((guess < 1) || (guess > 100)) {
            alert.innerHTML = `${guess} is out of range.<br>Guess <i>between</i> 1 and 100.`;
            turns += 1;
        }
        else if (guess > secret_number) {
            alert.innerHTML = `${guess} is too high.`
            turns += 1;
        }
        else if (guess < secret_number) {
            alert.innerHTML = `${guess} is too low.`
            turns += 1;
        }
        else{
            //I learned this from here!!! --> https://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button/13831737
            //The reason why I used it was because, if the user kept pressing it, it would add it to the turns. Additionally, I wanted
            //  my program to know when the game was over. I felt this was a fitting choice to tell that it is, in deed, over. If 
            //  Play again is selected, it will turn back on. I made sure it was still up-to-date with the current JS as well.
            //This function works with the method, .disabled, which can only take two assignments: true or false. If it is equal to true, 
            //  that means it will disable whatever object someone is trying to access. In my case, it just turns off a button for a while.
            //  If it's equal to false, though, that means the person can still access it. For me, I only want it to turn back on after
            //  the user says if they want to play again.
            //I really like this feature, not gonna lie
            button.disabled = true;
            alert.innerHTML = `The secret number was ${guess}!<br>It took you ${turns} turns to get it!`;
            main_content.insertAdjacentHTML('beforeend', `<button id='again'>Play Again?</button`)
            let play_again = document.querySelector('#again');
            //The only issue with this is I don't know how to get rid of it or disable it after it's been pressed, 
            //  so the user can just press this over and over again. 
            //Otherwise, this part resets everything to the original values, generates a new number, and adds 1 to the round number
            // FIXED! I forgot we covered .remove(), I didn't know it worked for HTML and querySelector too
            play_again.addEventListener('click', function(event){
                button.disabled = false;
                alert.innerHTML = "Hmm...I'm thinking of a number<br>between 1 and 100...";
                secret_number = secret_num();
                turns = 1;
                roundNum += 1;
                round.innerHTML = `<b><u>Round ${roundNum}</u></b>`;
                play_again.remove();
            });
        }
    }
    //If it isn't a number, I want to say whatever the heck they put in is not a number at all.
    else{
        alert.innerHTML = `"${guess}" is not a number.`;
        turns += 1
    }
});