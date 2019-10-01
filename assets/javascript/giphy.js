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
        }).then(function (response) {
            console.log(response);

            // var rating = response.data.0.Rating;
            // var year = response.data.Year;
        });
    }

    // Create function to load buttons from local storage
    function loadBtns() {
        var btnList = JSON.parse(localStorage.getItem("buttons"));

        gifs = btnList;
    }

    // Render the buttons to the page
    function renderButtons() {

        // Clear the div of any buttons
        $(".display-btn").empty();


        // Interate over the array
        for (var i = 0; i < gifs.length; i++) {

            // Create the buttons for category searched by user
            var buttons = `
            <div class="wrap-btn"
            <button class="btn btn-gifs" data-name="${gifs[i]}">${gifs[i]}</button>
            <button class="btn btn-close far fa-times-circle" data-name="${gifs[i]}" data-num="${i}"></button>
            </div>
            `;

            // Add the button to the html
            $(".display-btn").append(buttons);
        }

        // Store User inputs to local storage
        localStorage.setItem("buttons", JSON.stringify(gifs));
    };

    // load buttons stored in local storage
    loadBtns();

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    // This function handles events when a user searches a category
    $("#btn-submit").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gif = $("#add-gif").val().trim();

        // Adding the gif from the textbox to the array
        gifs.push(gif);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();
    });

    // Create a function to delete the dynamically created buttons
    function deleteButtons() {
        var btnNum = $(this).attr("data-num")

        // Delete the button clicked
        gifs.splice(btnNum, 1);

        // Create the buttons again
        renderButtons();
    };

    // Create event listener when user clicks the X button
    $(document).on("click", ".btn-close", deleteButtons)

    // Add a click event listener to all elements wit ha class of ".btn-gifs" 
    $(document).on("click", ".btn-gifs", displayGifInfo);






});