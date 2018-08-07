let startButton = document.getElementById("start");
let list = document.getElementById("list");
let choices = document.getElementById("choice");
let choiceButton;
// a list of key word to be set into the api automatically
let library = ["twitter", "black", "humor", "lol", "stupid", "funny", "viral", "beautiful", "blue", "light", "love", "neon", "TGIF", "Malaysia", "Perth", "Korea", "Japan", "USA", "UK", "prince", "princess", "rabbit", "bear", "snake", "tower", "fire", "China", "lion", "penguin", "giant", "girl", "school", "boy", "muscle", "ghost", "tibet", "water", "beach", "Europe", "wedding", "aeroplane", "coffee", "Paris"];
let keyword;
let choicesAvailable = [];
let choiceMade;

startButton.onclick = gameStart;

// start the game
function gameStart(){
	// initial the game
	choicesAvailable = [];
	list.innerHTML = "";
	choices.innerHTML = "";
	drawWord();
	addToArray();
	printOutChoices();
	getPic(keyword);
	// if the choice is correct as keyword, alert right else wrong and restart the game
	for (let i = 0; i < choiceButton.length; i++){
		choiceButton[i].onclick = function(event){
			choiceMade = event.target.innerHTML;
			if (choiceMade === keyword){
				window.alert("You are RIGHT!!!");
				gameStart();
			} else {
				window.alert("Correct answer is " + keyword);
				gameStart();
			}
		}
	}
}

// to print out the answer choices and append them
function printOutChoices(){
	choicesAvailable.sort();
	for (let i = 0; i < choicesAvailable.length; i++){
		let button = document.createElement("button");
		button.classList.add("choiceButton");
		button.innerHTML = choicesAvailable[i];
		let choicesItem = document.createElement("li");
		choicesItem.appendChild(button);
		choices.appendChild(choicesItem);
	}
	// set all the choices available under this button
	choiceButton = document.getElementsByClassName("choiceButton");
}

// to get answer choices
function addToArray(){
	for (let i = 0; i < 3; i++){
		getExtra();
	}
}

// to make sure the choices of answer always be 4
function getExtra(){
	let extra = library[Math.floor(Math.random() * library.length)];
	if (choicesAvailable.includes(extra) === false){
		choicesAvailable.push(extra);
	} else {
		return getExtra();
	}
}

// random choose a word from the word pool and set them as keyword to be search in api
function drawWord(){
	keyword = library[Math.floor(Math.random() * library.length)];
	choicesAvailable.push(keyword);
}

// get api service from tumblr
function getPic(keyword){
	// go to this routes with certain keyword
	fetch("https://api.tumblr.com/v2/tagged?tag=" + keyword + "&api_key=8iQdESZLueQOH3siwxhnyHlPDtpEJzTemakhaDfRcPealFl6Rb").then(
		function(response){
			// if response from the api is good, convert the response into json format
			if (!response.ok){
				return;
			} else {
				return response.json();
			}
		}
	).then(function(json){
		if (!json){
			return;
		}
		// if success, create img tag and li tag to put all the input from api into out page by appending them
		let items = json.response;
		for (let i = 0; i < items.length; i++){
			let item = items[i];
			if (item.photos !== undefined){
				let altSize = item.photos[0].alt_sizes;
				imgSrc = altSize[altSize.length - 3].url;
				let img = document.createElement("img");
				img.src = imgSrc;
				let listItem = document.createElement("li");
				listItem.appendChild(img);
				list.appendChild(listItem);
			}
		}
		// if error occurred anyway, log try
	}).catch(function(error){
		console.log("try");
	});
}