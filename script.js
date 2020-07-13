const messages = {
	ADDED: 'Quote added to your favourite quotes',
	REMOVED: 'Quote removed from your favourite quotes',
	CLEAR: 'You have no more favourite quotes :(',
	EMPTY: 'Your favs list is already empty',
	NULL: 'You have no favourite quotes yet'
}

const quotes = [
	'The right time is always now',
	'Think like a proton: always positive',
	'Do what yo can with what you have where you are',
	'Be a light in this world',
	'Life is more than one big to do list',
	'Done is better than perfect',
	'You are stronger than you think',
	'There is no failure you either win or learn',
	'Growing Takes Time',
	'Try to be a rainbow in someone’s cloud',
	'Life has no limitations, except the ones you make',
	'The future belongs to those who believe in the beauty of their dreams',
	'If opportunity doesn’t knock, build a door',
	'Walk slowly but never walk backward',
	'Keep calm and keep learning',
	'A little progress each day adds up to big results',
	'Positive thinking must be followed by positive doing',
	'Delete the negative; accentuate the positive',
	'Prepare to win the night before',
	'Life is not about finding yourself. Life is about creating yourself',
	'All progress takes place outside the comfort zone',
	'The only place where success comes before work is in the dictionary',
	'Your limitation it is only your imagination',
	'Push yourself, because no one else is going to do it for you',
	'Sometimes later becomes never. Do it now',
	'Little things make big days',
	'Create a life you can`t wait to wake up to',
	'You can',
	'Be a warrior, not a worrier',
	'If your dream don`t scare you the aren`t big enough'
]

const quotesCount = Object.keys(quotes).length;

let quote = document.querySelector('.quote__content');
let controls = document.querySelector('.control-panel');
let fav = document.querySelector('.control--show-favs');
let save = document.querySelector('.control--save-quote');
let clear = document.querySelector('.control--clear-favs');
let next = document.querySelector('.control--new-quote');

const notificationContent = document.querySelector(".notification__content");
const notificationContainer = document.querySelector(".notification");
const hideNotificationBtn = document.querySelector(".notification__hide");

const addNotification = (message) => {
	notificationContent.innerHTML = message;
	notificationContainer.classList.remove("notification--hidden");
	notificationContainer.classList.add("notification--active");
}

const hideNotification = () => {
	notificationContent.innerHTML = '';
	notificationContainer.classList.remove("notification--active");
	notificationContainer.classList.add("notification--hidden");
}

const closeModalBtn = document.querySelector(".modal__close");
const modalContainer = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalTitle = document.querySelector(".modal__title");

const openModal = () => {
	console.log("Modal open");
	modalContainer.classList.remove("modal--hidden");
	modalContainer.classList.add("modal--active");
	//quote.classList.add("is-blurred");
	//controls.classList.add("is-blurred");
}

const closeModal = () => {
	console.log("Modal close");
	modalContainer.classList.remove("modal--active");
	modalContainer.classList.add("modal--hidden");
	//quote.classList.remove("is-blurred");
	//controls.classList.remove("is-blurred");
}

let favs = [];
let formatedFavs = [];
let currentQuoteNumber = [];

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random()*(max - min) + min);
}

const getRandomQuoteNumber = () => {
	currentQuoteNumber = getRandomNumber(1, quotesCount);
}

const getRandomQuote = () => {
	getRandomQuoteNumber();
	quote.innerHTML += quotes[currentQuoteNumber];
}

const addToFav = () => {
	checkQuote(quotes[currentQuoteNumber]) ? console.log('Quote id=' + currentQuoteNumber + ' already added to favs') : favs.push(quotes[currentQuoteNumber]);
	addNotification(messages.ADDED);
	reloadFavsContent();
}

const removeFromFav = (quote) => {
	let removingQuote = quote.getAttribute("quote")
	favs.splice(favs.indexOf(removingQuote), 1);
	addNotification(messages.REMOVED);
	reloadFavsContent();
}

const showFavs = () => {
	openModal();
}

const clearFavs = () => {
	if (favs.length != 0) {
		favs = [];
		addNotification(messages.CLEAR);
	} else addNotification(messages.EMPTY);
}

const showNewQuote = () => {
	quote.innerHTML = '';
	getRandomQuote();
}

const checkQuote = (quote) => {
	return (favs.indexOf(quote) > -1);
}

const makeFavsContent = () => {
	console.log(favs);
	if(favs.length != 0) {
		favs.map(favItem => {
			modalContent.innerHTML += `
			<div class="fav__item">
				<span class="fav__content">${favItem}</span>
				<button type="button" quote="${favItem}" onclick="removeFromFav(this)" class="fav__control">Remove</button> 
			</div>
			`;
		});
	} else modalContent.innerHTML += `<div class="fav__item fav__item--empty">${messages.NULL}</div>`;
}

const reloadFavsContent = () =>{
    modalContent.innerHTML = "";
    makeFavsContent();
}

const initialModal = () => {
	modalTitle.innerHTML = 'Favourite quotes';
	modalContent.innerHTML += `<div class="fav__empty">${messages.NULL}</div>`;
}

window.onload = function() {
	initialModal();
    getRandomQuote();
	fav.onclick = showFavs;
	save.onclick = addToFav;
	clear.onclick = clearFavs;
	next.onclick = showNewQuote;
	hideNotificationBtn.onclick = hideNotification;
	closeModalBtn.onclick = closeModal;
}
