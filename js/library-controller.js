

var apiURL = "https://musiclibraryapi.azurewebsites.net";

function PopulateArtistContainer(){

    var url = apiURL + "/musicapi/search/artists?startIndex=0&count=10"
    console.log("Seding request for artists");

    $.get(url, function(data, status){

        console.log(data);

        var artist_container = document.getElementById("artist-container");
        artist_container.innerHTML = "";
    
        for(let i = 0; i < 10; i++){
            artist_container.innerHTML += "<div class=\"list-element\">" + data[i].artistName + "</div>";
        }

    });
}



document.addEventListener("DOMContentLoaded", function(){

    PopulateArtistContainer();
  
});
