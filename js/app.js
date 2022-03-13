// Create a list that holds all of your cards

let cardSymbols = ["fa-bicycle", "fa-bicycle" , "fa-coffee", "fa-coffee","fa-gift","fa-gift" , "fa-heart","fa-heart","fa-phone","fa-phone","fa-diamond","fa-diamond","fa-paw","fa-paw","fa-music","fa-music","fa-camera","fa-camera","fa-bomb","fa-bomb","fa-futbol-o","fa-futbol-o","fa-rocket","fa-rocket","fa-money"]
let visibleCard;
let firstCard;
let secondCard;
let matchCardnumber = 0;
let movescount = 0;
let stars = [document.querySelectorAll('.fa-star')];
let ratingvalue = 0;

let FourXFour_var =true;


//shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// add each card's HTML to the page
// loop through each card and create its HTML
// inspire by Ryan Waite
function generateGameBoard() {
    let cardItemList;
    var arr = document.querySelectorAll("li");
    let i ; 
    for(let i =0 ; i <arr.length ;i++)
    {
        arr[i].parentNode.removeChild(arr[i]);
    }
    if(FourXFour_var == true)
     cardItemList = shuffle(cardSymbols.slice(0,16));
    else    
     cardItemList = shuffle(cardSymbols);

    

    cardItemList.forEach(function (cardClassName, index) {
   
        let cardDeck = document.querySelector(".deck");
        let cardItem = document.createElement("li");

      
        cardItem.setAttribute('id', index);
        cardItem.setAttribute('name', cardClassName);
        cardItem.classList.add("card");
        // set up the event listener for a card. If a card is clicked:
        cardItem.setAttribute('onclick', 'startGame(this)');

        let symbolsItem = document.createElement("i");
        symbolsItem.classList.add("fa");
        symbolsItem.classList.add(cardClassName);

        cardItem.appendChild(symbolsItem);
        cardDeck.appendChild(cardItem);

    });

};

// creat faunction to match crds
function startGame(tempCard) {


    tempCard.classList.add('open');
    tempCard.classList.add('show');

    if (firstCard && secondCard) {
        //if null start to remove class open and show from first & scond card to can start from beging

        firstCard.classList.remove('open');
        firstCard.classList.remove('show');

        secondCard.classList.remove('open');
        secondCard.classList.remove('show');

        firstCard = null;
        secondCard = null;

    }
    //debugger;
    if (!visibleCard) {

        visibleCard = tempCard;
        movescount++;
        // console.log(movescount);
        
        moveCounter();
    } else {
        // Create object that's will have id and name
        let item = {
            id: tempCard.getAttribute('id'),
            name: tempCard.getAttribute('name')
        };

        if (checkMatchCard(item)) {

            tempCard.classList.add('match');
            tempCard.removeAttribute('onclick');

            visibleCard.classList.add('match');
            visibleCard.removeAttribute('onclick');

            matchCardnumber += 1;
            // console.log(matchCardnumber);

            // check if finshed game and user win 
            gameOver();
        }

        firstCard = tempCard;
        secondCard = visibleCard;
        visibleCard = null;

        // fire function clearSelectedCards () to can start click on new card
        clearSelectedCards();
    }
}

function checkMatchCard(item) {
    let card = {
        id: visibleCard.getAttribute('id'),
        name: visibleCard.getAttribute('name'),
        cardIsOpen: visibleCard.classList.contains('open')
    };

    return (item.name === card.name && item.id !== card.id && card.cardIsOpen);
}

// function to rmove class open and show from  cards [first and second card]
function clearSelectedCards() {
    setTimeout(() => {
        if (firstCard) {
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            firstCard = null;
        }

        if (secondCard) {
            secondCard.classList.remove('open');
            secondCard.classList.remove('show');
            secondCard = null;
        }
    }, 1000);
}


//Game over funcatio to check if user finshed game or no
function gameOver() {
    // debugger;/
    if (matchCardnumber == 8) {

        let modal = document.querySelector('.popup');
        let close = document.querySelector('.close');

        document.querySelector("#moves").textContent = movescount;
        document.querySelector("#rating").textContent = ratingvalue;
        document.querySelector('#timer').textContent = timercount.getTimeValues().toString();

        //   debugger;
        modal.style.display = "block";

        close.onclick = function () {
            modal.style.display = "none";
            location.reload()
        }
    }
}

// function to count moves
function moveCounter() {

    let movesContainer = document.querySelector('.moves');
    movesContainer.textContent = movescount;
    rating();
};


// Function to  play Again
function playAgain() {
    let moves = document.querySelector('.moves')
    movescount = 0;
    moves.innerHTML = '0';
    let restartbtn = document.querySelector('.restart');
    restartbtn.onclick = function () {
        location.reload();
    }

}

function rating() {
    // make for loop on starts list to can check 
    // if number of movement = 20 I'll remove first gold class
    // if number of movement = 25 I'll remove second gold class
    // if number of movement = 30 I'll remove third gold class
    //alert(3);
    // console.log(movescount);
    for (star of stars) {
        // console.log(star[1])
        if (movescount === 20) {
            star[2].classList.remove("gold-star");
            ratingvalue = "  Very Good " + 2;
        } else if (movescount === 25) {
            star[1].classList.remove("gold-star");
            ratingvalue = " Good " + 1;
        } else if (movescount === 30) {
            star[0].classList.remove("gold-star");
        } else if (movescount <= 19) {
            ratingvalue = " Excellent " + 3;
        }
    }

}





// fire function
function FourFunc()
{
    
    FourXFour_var =true;
    generateGameBoard();
    playAgain();        
    var element = document.getElementsByClassName("deck")[0];
    element.style.width = "660px";
    element.style.height = "680px";
}

function FivthFunc()
{
    FourXFour_var =false;
    generateGameBoard();
    playAgain();  
    var element = document.getElementsByClassName("deck")[0];
    console.log(element)
    element.style.width = "760px";
    element.style.height = "780px";
}

if(FourXFour_var == true)
    FourFunc();
else
    FivthFunc();



