$(document).ready(function () {
    //makes the ajax call and renders the gifs
    function displayGif() {
        $("#gifs-viewer").empty();
        var searchGif = $(this).attr("data-name");
        // Put unique api key here
        var apiKey = "j8LBUB49P4obbRWYVF2YI9emqXQImNmk";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchGif + "&limit=25&offset=0&rating=G&lang=en";
        console.log(queryURL)
        // function to make the ajax call
        function ajaxSearch() {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                // console.log(response.data[0].rating);
                // console.log(response.data[0].title);
                // console.log(response.data[0].images.fixed_height_small.url);

                //grabs 10 responses from the response object
                for (var i = 0; i < 10; i++) {
                    function renderer() {
                        var topicDiv = $("<div class='unit'>").addClass("topic");
                        var rating = response.data[i].rating;
                        var pOne = $("<p>").text("Rating: " + rating);
                        topicDiv.append(pOne);
                        var image = $("<img class='gif'>");
                        //gives the images attributes to enable the onclick to change the data state
                        image.attr("src", response.data[i].images.fixed_height_small_still.url);
                        image.attr({ 'data-animate': response.data[i].images.fixed_height_small.url });
                        image.attr({ 'data-state': "still" });
                        image.attr({ 'data-still': response.data[i].images.fixed_height_small_still.url });
                        topicDiv.append(image);
                        $("#gifs-viewer").append(topicDiv);
                    }
                    
                    for (var i = 0; i < 10; i++) {
                    renderer()
                    };
                }

            });
        }
        ajaxSearch()
    }

    // $(document).on("click", ".movie-btn", displayMovieInfo);

    $(document).on("click", ".gif", function () {
        console.log("This is working");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    });

    var topics = ["bigfoot", "chupacabra", "nessie", "megalodon", "yeti", "yowie", "kraken", "bioluminescent pterodactyl"];
    function renderButtons() {
        $("#button-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gifTopic");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#button-view").append(a);
        }
    }
    $("#add-topic").on("click", function (event) {
        console.log("GOT IT");
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
        $('#topic-form')[0].reset();
    });
    $(document).on("click", ".gifTopic", displayGif);
    renderButtons();

});