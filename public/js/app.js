const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	messageOne.innerText = 'Loading...';
	messageTwo.innerText = '';
	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.innerText = data.error;
				messageTwo.innerText = '';
			} else {
				messageOne.innerText = `Location: ${data.location}`;
				messageTwo.innerText = `Forecast: ${data.forecast}`;
			}
		});
	});
});
