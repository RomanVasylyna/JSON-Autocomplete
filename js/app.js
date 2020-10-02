$(document).ready(() => {



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









})
