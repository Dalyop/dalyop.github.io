// isFetched = true;

// let myPromise = new Promise((resolve, reject) => {
//     if (isFetched) {
//         resolve('Data fetched successfully');
//     } else {
//         reject('Failed to fetch data');
//     }
// });

// async function onSuccess(me) {
//     await console.log(me);
// }

// function onError(error) {
//     console.log(error);
// }

// myPromise.then(onSuccess, onError);
// myPromise.catch(onError);




// This is my API key
const API_KEY = '120a8f349fdda1224939b03619966397';

// This gets the input value
let location = document.querySelector('.inputValue');
console.log(location)

// The API URL
let api_url = `https://api.openweathermap.org/data/2.5/weather?q=&appid=${API_KEY}`;






























