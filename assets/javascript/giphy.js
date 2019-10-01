// Ready the document
$(document).ready(function () {

    // Create global varibles
    // Array of selected gifs
    var gifs = [];
    var apiKey = "wlls0MTP5W9mbTuI6ZqNEJUScOOmKLBR";
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=wlls0MTP5W9mbTuI6ZqNEJUScOOmKLBR&"

    // Create the ajax call to call and retrieve data from the api
    // function displayGifInfo() {




    //     $.ajax({
    //         url: url,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);

    //         // var rating = response.data.0.Rating;
    //         // var year = response.data.Year;
    //     });
    // }

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

    // <div class="giphy-info">
    //      <div class="card">
    //          <i class="far fa-star favorite" data-id="${giphy.id}" data-star="false">
    //           <img src="..." class="card-img-top" alt="...">
    //           <div class="card-body">
    //                <h5 class="card-title">Card title</h5>
    //                <p class="card-text">Some quick example text to build on the card title and make up the bulk of
    //                         the card's content.</p>
    //            </div>
    //      </div>

    // </div>

    //Create function to render the data received from giphy
    function createGiphy(giphys) {
        for (var i = 0; i < giphys.length; i++) {
            var giphy = giphys[i];

            var image = giphy.images;

            var giphyDisplay = `
            <div class="giphy-info">
            <div class="card col-md-4">
                <i class="far fa-star favorite" data-id="${giphy.id}" data-star="false">
                <img src="${image.original_still.url}"
                data-still="${image.original_still.url}"
                data-animate="${image.original.url}"
                data-state="${giphy.embed_url}" 
                class="card-img-top" 
                alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                    </div>
                    <div class="footer" data-link="${giphy.embed_url}">
                        <p>Copy Link <i class="fa fa-link"></i></p>
                    </div>    
            </div>
        </div>
         `;

            $(".giphy").append(giphyDisplay);
        }
    }

    // This function handles events when a user searches a category
    $("#btn-submit").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gif = $("#add-gif").val().trim();

        // Adding the gif from the textbox to the array
        gifs.push(gif);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();

        var url = queryURL + "q=" + gif;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var giphys = response.data;

            createGiphy(giphys);
        });
    });

    // Create a function to delete the dynamically created buttons
    function deleteButtons() {
        var btnNum = $(this).attr("data-num")

        // Delete the button clicked
        gifs.splice(btnNum, 1);

        // Create the buttons again
        renderButtons();
    };


    // displayGifInfo();

    // Create event listener when user clicks the X button
    $(document).on("click", ".btn-close", deleteButtons)

    // Add a click event listener to all elements wit ha class of ".btn-gifs" 
    // $(document).on("click", "#btn-sumbit", displayGifInfo)






});

