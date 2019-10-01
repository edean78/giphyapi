// Ready the document
$(document).ready(function () {

    // Create global varibles
    // Array of selected gifs
    var gifs = ["cats", "dogs", "lions", "tigers"];

    // Create the ajax call to call and retrieve data from the api
    // function displayGifInfo() {

    //     var apiKey = "wlls0MTP5W9mbTuI6ZqNEJUScOOmKLBR";
    //     var gif = $(this).attr("data-name");
    //     var userInput = "cats";
    //     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wlls0MTP5W9mbTuI6ZqNEJUScOOmKLBR&q=dogs"
    //     // var gueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userInput;
        
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //       }).then(function(response) {
    //         console.log(response);

    //         // var rating = response.data.0.Rating;
    //         // var year = response.data.Year;
    //       });
    // }

    // Render the buttons to the page

    function renderButtons(){

        $(".display-btn").empty();

        for (var i = 0; i < gifs.length; i++){

            var button = `
            <div class="wrap-btn"
            <button class="btn btn-gifs" data-name="${gifs[i]}">${gifs[i]}</button>
            <button class="btn btn-close far fa-times-circle" data-name="${gifs[i]}"></button>
            </div>
            `;

            $(".display-btn").append(button);
        }
    }

    renderButtons();

    // Create a on click functions to get data from the api and display them on the page




});