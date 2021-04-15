const weatherForm = document.querySelector('form');
const button = document.querySelector('button');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');
const message5 = document.querySelector('#message-5');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    message1.textContent = "loading..";
    message2.textContent = "";


    fetch("/weather?address="+ location)
    .then((response) => {
        response.json()
        .then((data) => {
            if(data.error){
                message1.textContent = data.error;
            } else {
                message1.textContent = "Address: "+data.address;
                message2.textContent =  "Location: "+data.location;
                message3.textContent = "Temperature: "+ data.temperature;
                message4.textContent = "Weather: "+ data.weather;
                message5.textContent = "Rain: "+ data.rain;

            }

        });

    });
});