$(document).ready(function () {

    function displayGif() {
        $("#gifs-viewer").empty();
        var searchGif = $(this).attr("data-name");

        var apiKey = "j8LBUB49P4obbRWYVF2YI9emqXQImNmk";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchGif + "&limit=25&offset=0&rating=G&lang=en";
        console.log(queryURL)
        // Creating an AJAX call for the specific movie button being clicked
        function ajaxSearch() {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.data[0].rating);
                console.log(response.data[0].title);
                console.log(response.data[0].images.fixed_height_small.url);
                // Creating a div to hold the movie
                for (var i = 0; i < 10; i++) {
                    function renderer() {
                        var topicDiv = $("<div class='unit'>").addClass("topic");
                        // Storing the rating data
                        var rating = response.data[i].rating;

                        // Creating an element to have the rating displayed
                        var pOne = $("<p>").text("Rating: " + rating);

                        // Displaying the rating
                        topicDiv.append(pOne);
                        //   // Retrieving the URL for the image
                        // var stillImgURL = response.data.fixed_height_small_still_url;

                        // var motionImgUrl = response.data.fixed_height_small_url;

                        //   // Creating an element to hold the image
                        var image = $("<img class='gif'>");
                        image.attr("src", response.data[i].images.fixed_height_small_still.url);
                        image.attr({ 'data-animate': response.data[i].images.fixed_height_small.url });
                        image.attr({ 'data-state': "still" });
                        image.attr({ 'data-still': response.data[i].images.fixed_height_small_still.url });

                        //   // Appending the image
                        topicDiv.append(image);

                        // Putting the entire movie above the previous movies
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
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    });

    var topics = ["bigfoot", "chupacabra", "nessie", "megalodon", "yeti", "yowie", "kraken"];
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
    });
    $(document).on("click", ".gifTopic", displayGif);
    renderButtons();

});