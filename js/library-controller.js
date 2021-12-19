
function PopulateArtistContainer(){
    console.log("Hello!");

    var artist_container = document.getElementById("artist-container");

    artist_container.innerHTML = "";

    for(let i = 0; i < 10; i++){
        artist_container.innerHTML += "<div class=\"list-element\">Artist Item</div>";
    }

    
}



document.addEventListener("DOMContentLoaded", function(){

    PopulateArtistContainer();
  
});
