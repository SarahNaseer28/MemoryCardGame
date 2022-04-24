let cardArray = [
    { name: "p", img: "images/pens.jpg",},
    { name: "p", img: "images/pens.jpg"},
    { name: "b", img: "images/books.jpg", },
    { name: "b", img: "images/books.jpg", },
    { name: "d", img: "images/donuts.jpg", },
    { name: "d", img: "images/donuts.jpg", },
    { name: "f", img: "images/food.jpg", },
    { name: "f", img: "images/food.jpg", },
    { name: "c", img: "images/coffee.jpg", },
    { name: "c", img: "images/coffee.jpg", },
    { name: "coo", img: "images/cookies.jpg", },
    { name: "coo", img: "images/cookies.jpg", },
    ];
   
    //define variables and get DOM element
   
    let grid = document.querySelector(".grid");
    let scoreBoard = document.querySelector(".scoreBoard");
    let popup = document.querySelector(".popup");
    let playAgain = document.querySelector(".playAgain");
    let clickBoard = document.querySelector(".clickBoard");
    let imgs;
    let cardsId = [];
    let cardsSelected = [];
    let cardsWon = 0;
    let clicks = 0;
    document.addEventListener("DOMContentLoaded", function () {
       

//define functions
       
        createBoard(grid, cardArray);
        arrangeCard();
        playAgain.addEventListener("click", replay);
        //add a click function for images
       
        imgs = document.querySelectorAll("img");
        Array.from(imgs).forEach(img =>
        img.addEventListener("click", flipCard)
        )
        });

       
       

//createBoard function

function createBoard(grid, array) {
    popup.style.display = "none";
    array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", "images/blank.webp");
    img.setAttribute("data-id", index);
    img.setAttribute("width", "240px");
    img.setAttribute("height","240px");
    grid.appendChild(img);
    })
    }
   


// arrangeCard function
   
    function arrangeCard() {
    cardArray.sort(() => 0.5 - Math.random())
    }
   


// flip Card function
   
    function flipCard() {
    let selected = this.dataset.id;
    cardsSelected.push(cardArray[selected].name);
    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", cardArray[selected].img);
    if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
    }
    }

   

 
// checkForMatch function

function checkForMatch() {
    let imgs = document.getElementsByTagName("img");
    let firstCard = cardsId[0];
    let secondCard = cardsId[1];
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    alert("You have found a match");
    cardsWon += 1;
   
    scoreBoard.innerHTML = cardsWon;
    setTimeout(checkWon,500)
    } else {
    imgs[firstCard].setAttribute("src", "images/blank.webp");
    imgs[secondCard].setAttribute("src", "images/blank.webp");
    alert("Wrong, Please try again");

    imgs[firstCard].classList.remove("flip"); imgs[secondCard].classList.remove("flip");
    }
    cardsSelected = [];
    cardsId = [];
    clicks += 1;
    clickBoard.innerHTML = clicks;
    }
   


    function checkWon() {
    if (cardsWon == cardArray.length / 2) {
    alert("You won");
    document.getElementById("timer").innerHTML="Game over!";
    setTimeout(() => {  location.replace("index.html"); }, 0);
    }
    }



    // The replay function

function replay() {
    arrangeCard();
    grid.innerHTML = "";
    createBoard(grid, cardArray);
    cardsWon = 0;
    clicks = 0;
    clickBoard.innerHTML = 0;
    scoreBoard.innerHTML = 0;
    popup.style.display = "none";
    }


var timer;
var timeLeft=null;


function updateTimer() {
      timeLeft = timeLeft - 1;
      if(timeLeft >= 0)
        document.getElementById("timer").innerHTML=timeLeft;
      else {
        clearTimeout(timer);
    out();
      }
       
      }
   


function timerstart(val) {
      timeLeft=val;
      timer = setInterval(updateTimer, 1000);
      updateTimer();
    }


function out(){

    const list = document.getElementById("grid");
    while (list.hasChildNodes())
    {
    list.removeChild(list.firstChild);
    }
    list.remove();
      const para = document.createElement("h2");
      para.innerText = "OOPS! TIME UP";
      document.body.appendChild(para);
      document.getElementById("timer").innerHTML="TIME UP";
      setTimeout(() => {  location.replace("index.html"); }, 3000);
    }


const collection = document.getElementsByClassName("container");
collection[0].innerHTML = "Memory Card Game";