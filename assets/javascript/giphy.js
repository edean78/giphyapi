// Ready the document
$(document).ready(function () {

    // Create global varibles
    // Array of selected gifs
    var gifs = [];
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wlls0MTP5W9mbTuI6ZqNEJUScOOmKLBR&"


    // // Create function to load buttons from local storage
    // function loadBtns() {
    //     var btnList = JSON.parse(localStorage.getItem("buttons"));

    //     gifs = btnList;
    // }

    // Render the buttons to the page
    function renderButtons() {

        // Clear the div of any buttons
        $(".display-btn").empty();

        // Interate over the array
        for (var i = 0; i < gifs.length; i++) {

            // Create the buttons for category searched by user
            var buttons = `
            <div class="wrap-btn">
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

    //Create function to render the data received from giphy
    function createGiphy(giphys) {

        // Clear the giphy content
        $(".giphy").empty();

        for (var i = 0; i < giphys.length; i++) {
            var giphy = giphys[i];

            var image = giphy.images;

            var giphyDisplay = `
            <div class="giphy-info">
                <div class="card">
                    <i class="far fa-star favorite" data-id="${giphy.id}" data-star="false"></i>
                    <img src="${image.original_still.url}"
                    data-still="${image.original_still.url}"
                    data-animate="${image.original.url}"
                    data-state="${giphy.embed_url}" 
                    class="card-img-top" id="giphy-img">
                        <div class="card-body">
                            <h5 class="card-rating">Rating: ${giphy.rating}</h5>
                            <h5 class="card-posted">Posted: ${giphy.import_datetime}</h5>
                        </div>
                    <div class="card-footer" data-link="${giphy.embed_url}">
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

        // Reset input
        $("#add-gif").val("");

        getGiphy(gif);

    });

    // Create function to retrieve giphy data
    function getGiphy(value){
        var url = queryURL + "q=" + value;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var giphys = response.data;

            createGiphy(giphys);
        });
    }

    // Create a function to animate the gif when clicked
    function animateGif(){
        var state = $(this).attr("data-state");

        if(state === "animate"){
            $(this).attr("data-state", "still");
            $(this).attr("src",$(this).attr("data-still"));
        } else {
            $(this).attr("data-state", "animate");
            $(this).attr("src",$(this).attr("data-animate"));
        }
    }


    // Create a function to delete the dynamically created buttons
    function deleteButtons() {
        var btnNum = $(this).attr("data-num")

        // Delete the button clicked
        gifs.splice(btnNum, 1);

        // Create the buttons again
        renderButtons();
    };

    // Create function to copy the link below to clipboard
    function copyToClipboard(value){
        var temp = $("<input>");
        $("body").append(temp);
        temp.val(value).select();
        document.execCommand("copy");
        temp.remove();
    };

    // Create function to copy link
    function copyLink(){

        var link = $(this).attr("data-link");
        console.log(link)

        copyToClipboard(link);
    };

    // Create a function to search by button
    function btnSearch(){

        var btnName = $(this).attr("data-name");

        getGiphy(btnName);
    }

    // // load buttons stored in local storage
    // loadBtns();

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    // Create event listener when user clicks the X button
    $(document).on("click", ".btn-close", deleteButtons)

    // Event listener to animate gif when clicked
    $(document).on("click", "#giphy-img", animateGif)

    // Event listener to copy the link
    $(document).on("click", ".card-footer", copyLink)

    // Event listner to search by button
    $(document).on("click", ".btn-gifs", btnSearch)

});

