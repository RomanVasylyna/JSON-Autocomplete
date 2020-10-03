$(document).ready(() => {


/*
SYNC - ждешь пока выполнится одна функция, и только потом выполняешь другую
ASYNC - не ждешь пока что-то выполнится, оно выполняется

1) Callbacks
Когда одна функция передается в параметр другой - это callback

изначально в js функции выполняются сверхну вниз

Бывает, что у функции есть задержка в выполнении (setTimeout или ответ от сервера)
В таком случае, выполнится сразу следом идущая функция. Нам это не нужно
По этому в таком случае используем callback


//Posts array
let posts = [
{title : 'Post One', body : 'This is post one'},
{title : 'Post Two', body : 'This is post two'},
];


//Getting Posts
function getPosts() {
setTimeout(() => {

 let output = '';

 posts.forEach(post => {
 output += `
 <div>${post.title}</div>
 `;

 console.log(post.title + ' was created');
 })

 $('#result').append(output);

}, 2000);
}


//Adding Post to Array
function createPost(post, callback) {
setTimeout(() => {
posts.push(post);
callback();
}, 1000);
}


//Activating Functions
createPost({title : 'Post Three', body : 'This is post three'}, getPosts);

function taskOne(callback) {
console.log('task 1');
callback();
}

function taskTwo() {
console.log('task 2');
}

setTimeout(() => taskOne(taskTwo), 1000);


2) Promises
//Posts array
let posts = [
{title : 'Post One', body : 'This is post one'},
{title : 'Post Two', body : 'This is post two'},
];


//Getting Posts
function getPosts() {
setTimeout(() => {

 let output = ''; //Переменная куда кладем хтмл элемент

 posts.forEach(post => { //В цикле создаем элемент
 output += `
 <div>${post.title}</div>
 `;

 console.log(post.title + ' was created');
 })

 $('#result').append(output);

}, 2000); //Задержка 2 сек
}


//Adding Post to Array
function createPost(post) {
return new Promise((resolve, reject) => { //Функция возвращает promise

  setTimeout(() => { //Таймер
  posts.push(post); //пушим в массив еще один обьект

  let error = false;

  //Проверка на ошибку
  if(!error) {
  resolve();
  } else {
  reject('Error occured');
  }

  }, 1000);
})
}


createPost({title : 'Post Three', body : 'This is a post three'})
.then(getPosts())
.catch(error => console.log(error));


3) Promise.all - промис в форме массива

let promise1 = Promise.resolve('Hello World'); //Успешный промис
let promise2 = 10;
let promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Goodbye')); //Успешный промис через 2 сек

let promise4 = fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json());

Promise.all([promise1, promise2, promise3, promise4]).then(values => console.log(values));


4) ASYNC/AWAIT
//Adding Post to Array
async function init() {
  await createPost({title : 'Post Three', body : 'This is a post three'});
  getPosts();
}


5) ASUNC/AWAIT/FETCH
async function fetchUsers() {
let result = await fetch('https://jsonplaceholder.typicode.com/users');
let data = await result.json();

console.log(data);
}

fetchUsers();

*/


//Fetch JSON Obj
async function fetchJson() {
let result = await fetch('./data.json');
let obj = await result.json();
return obj;
}


//Input event
$('#search').on('keyup', async function() {
//Clearing Parent
$('#result').empty();

//Work with object
let obj = await fetchJson();
let matches = obj.filter(state => {
let regex = new RegExp(`^${this.value}`, 'gi');
return state.name ? state.name.match(regex) : state.abbr.match(regex);
});

//Autocomplete func
if($(this).val().length > 0) {
  displayStates(matches);
}

//Card Events
$('.card').on('click', function() {
$('#result').empty();
$('#search').val($(this).find('#name').text());
})
});


//Create UI
function displayStates(obj) {

let display = '';

obj.forEach(e => {
  display += `
  <div class="card p-1 mb-1">
  <div class="card-body">
  <h3><span id="name">${e.name}</span> (<span>${e.abbr}</span>) <span class="text-info">${e.capital}</span></h3>
  <small class="text-muted">Latitude : ${e.lat} / Longitude : ${e.long}</small>
  </div>
  </div>`;
})


$('#result').append(display);
}






















/*
  //Fetching JSON Object
  let searchStates = async (searchText, callback = function() {}) => {

  let get = await fetch('./data.json'); //Getting File
  let obj = await get.json(); //Getting JSON object

  console.log(Object.entries(obj));

  let matches = Object.values(obj).filter(state => { //JSON object into array + filter loop
  let regex = new RegExp(`^${searchText}`, 'gi'); //Regex
  return state.name ? state.name.match(regex) : state.abbr.match(regex); //Return city or it's capital if it matches regex
  });
  callback(matches, obj); //Callback?
  }



  //Search Keyup Event Listener
  $('#search').on('keyup', function() {
    $('#result').empty(); //Clearing parent

     if($(this).val().length > 0) {
       searchStates($(this).val(), function(matches, obj) { //Run Search State function
         for(let i = 0; i < matches.length; i++) {
           createContent(matches[i].name, matches[i].abbr, matches[i].capital, matches[i].lat, matches[i].long); //Add cards with content
         }
       });
     }

  });



  //Creating Content from json object
  function createContent(city, abbr, capital, lat, long) {
    let display =
       `<div class="card align-text-start mb-1">
        <div class="card-body">
        <h3><span id="city" class="pr-1">${city}</span>(<span id="abbr">${abbr}</span>)<span class="text-info pl-1" id="capital">${capital}</span></h3>
        <small class="text-muted">Lat : <span id="latitude">${lat}</span></small>
        <small class="text-muted">/ Long : <span id="longitude">${long}</span></small>
        </div>
        </div>`;

       //Add cards to UI
       $('#result').append(display);

       //Adding Event To Cards
       $('.card').on('click', function() {
       $('#search').val($(this).find('#city').text());
       $('#result').empty();
       });
  }
*/








})
