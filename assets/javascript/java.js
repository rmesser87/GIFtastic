$(document).ready(function () {

    function displayGif() {
        $("#gifs-view").empty();
        var searchGif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=j8LBUB49P4obbRWYVF2YI9emqXQImNmk&tag=" + searchGif;
        console.log(queryURL)
        // Creating an AJAX call for the specific movie button being clicked
        function ajaxSearch() {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.data.rating);
                // Creating a div to hold the movie
                var topicDiv = $("<div class='unit' data-state='still'>").addClass("topic");

                // Storing the rating data
                var rating = response.data.rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                topicDiv.append(pOne);
                //   // Retrieving the URL for the image
                // var stillImgURL = response.data.fixed_height_small_still_url;

                // var motionImgUrl = response.data.fixed_height_small_url;

                //   // Creating an element to hold the image
                var image = $("<img id='gifImg'>");
                image.attr("src", response.data.fixed_height_small_still_url);
                image.attr({ 'data-animate': response.data.fixed_height_small_url });
                image.attr({ 'data-state': "still" });
                image.attr({ 'data-still': response.data.fixed_height_small_still_url });

                //   // Appending the image
                topicDiv.append(image);

                // Putting the entire movie above the previous movies
                $("#gifs-view").append(topicDiv);

            });
        }
        for (var i = 0; i < 10; i++) {
            ajaxSearch()
        }

        $("#gifImg").on("click", function () {


            var state = $(this).attr('data-state');


            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }

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
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
    });
    $(document).on("click", ".gifTopic", displayGif);
    renderButtons();

});