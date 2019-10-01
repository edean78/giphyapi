// Ready the document
$(document).ready(function () {

    // Create global varibles
    // Array of selected gifs
    var gifs = [];

    // Create the ajax call to call and retrieve data from the api
    function displayGifInfo() {

        var apiKey = "wlls0MTP5W9mbTuI6ZqNEJUScOOmKLBR";
        var gif = $(this).attr("data-name");
        var userInput = "";
        var gueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userInput;
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);

            // var rating = response.data.0.Rating;
            // var year = response.data.Year;
          });
    }

    // Render the buttons to the page

    function renderButtons(){

        // Clear the div of any buttons
        $(".display-btn").empty();


        // Interate over the array
        for (var i = 0; i < gifs.length; i++){

            // Create the buttons for category searched by user
            var button = `
            <div class="wrap-btn"
            <button class="btn btn-gifs" data-name="${gifs[i]}">${gifs[i]}</button>
            <button class="btn btn-close far fa-times-circle" data-name="${gifs[i]}"></button>
            </div>
            `;

            // Add the button to the html
            $(".display-btn").append(button);
        }
    }

    // This function handles events when a user searches a category
    $("#btn-search").on("click", function(event){
        event.preventDefault();

        // This line grabs the input from the textbox
        var gif = $("#add-gif").val().trim();

        // Adding the gif from the textbox to the array
        gifs.push(gif);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();
    })

    renderButtons();

    




});