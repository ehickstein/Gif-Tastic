$(document).ready(function(){
    var topics = ["Ryan Gosling", "Tom Cruise", "Leonardo DiCaprio", "Aubrey Plaza", "Elizabeth Olsen", "Chris Evans", "Emilia Clarke", "Peter Dinklage", "Joseph Gordon-Levitt", "Michael Cera"];

    function images(){
        $("#gifContent").empty();
        var input = $(this).attr("data-name");
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=10&api_key=TM39H5UY6vSPq1jgcgo1IbdHIXqsxaqO";
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            for(i=0;i< 10; i++){
                var imageDisplay = $("<div>");
                imageDisplay.addClass("holder");
                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                imageDisplay.append(image);
                var rating = response.data[i].rating;
                var ratingDisplay = $("<p>").text("Rating: " + rating.toUpperCase());
                imageDisplay.append(ratingDisplay);
                $("#gifContent").append(imageDisplay);

            }
        });
    }

    function buttons(){
        $("#gifHeader").empty();
        for(j=0; j < topics.length; j++){
            var button = $("<button>");
            button.attr("class", "btn");
            button.attr("id", "input");
            button.attr("data-name", topics[j]);
            button.text(topics[j]);
            $("#gifHeader").append(button);
        }
    }

    function gifPlay(){
        var state = $(this).attr("data-state");
        var animateGif = $(this).attr("data-animate");
        var stillGif = $(this).attr("data-still");
        if(state == "still"){
            $(this).attr("src", animateGif);
            $(this).attr("data-state", "animate");
        }
        else if(state == "animate"){
            $(this).attr("src", stillGif);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitButton").on("click", function(){
        var input = $("#newCeleb").val().trim();
        topics.push(input);

        buttons();

        return false;
    })

    buttons();

    $(document).on("click", "#input", images);
    $(document).on("click", ".gif", gifPlay);
});