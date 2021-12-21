
var user_library;

var apiURL = "https://musiclibraryapi.azurewebsites.net";

function PopulateArtistContainer(){

    var url = apiURL + "/musicapi/search/artists?startIndex=0&count=20";
    console.log("Seding request for artists");

    $.get(url, function(data, status){

        console.log(data);

        PopulateContainerTitle("Discover Artists", "Artist Name", "Albums", "Songs");

        var artist_container = document.getElementById("artist-container");
        artist_container.innerHTML = "";
    
        for(let i = 0; i < data.length; i++){

            const container_div = document.createElement("div");
            container_div.classList.add("artist-element-container");
            artist_container.appendChild(container_div);

            const follow_button = document.createElement("button");
            follow_button.classList.add("list-element");
            follow_button.classList.add("follow-button");
            container_div.appendChild(follow_button);

            const button = document.createElement("button");
            button.classList.add("list-element");
            button.classList.add("list-button");
            container_div.appendChild(button);
            
            const first_div = document.createElement("div");
            first_div.classList.add("list-button-text");
            first_div.classList.add("col-4");
            button.appendChild(first_div);

            const second_div = document.createElement("div");
            second_div.classList.add("list-button-text");
            second_div.classList.add("col-4");
            button.appendChild(second_div);

            const third_div = document.createElement("div");
            third_div.classList.add("list-button-text");
            third_div.classList.add("col-4");
            button.appendChild(third_div);

            var artist = data[i];
            var songCount = 0;
            for(let j = 0; j < artist.albums.length; j++){
                songCount += artist.albums[j].songs.length;
            }

            first_div.innerHTML = artist.artistName;
            second_div.innerHTML = artist.albums.length + " Albums";
            third_div.innerHTML = songCount + " Songs";

            button.onclick = function(){
                PopulateAlbumsForArtist(data[i]);
            }


            if(IsFollowingArtist(data[i].id)){
                follow_button.innerHTML = "&#9829;";
                follow_button.onclick = function(){
                    UnfollowArtist(data[i].id, PopulateArtistContainer);
                }
            }
            else{
                follow_button.innerHTML = "&#9825;";
                follow_button.onclick = function(){
                    FollowArtist(data[i].id, PopulateArtistContainer);
                }
            }

            
        }

    });
}


function PopulateAlbumsForArtist(artist){
    console.log(artist);
    console.log("Artist: " + artist.artistName);

    PopulateContainerTitle(artist.artistName + "'s Albums", "Album Name", "Songs", "By Artist");

    var artist_container = document.getElementById("artist-container");
    artist_container.innerHTML = "";

    for(let i = 0; i < artist.albums.length; i++){

        const container_div = document.createElement("div");
        container_div.classList.add("artist-element-container");
        artist_container.appendChild(container_div);

        const follow_button = document.createElement("button");
        follow_button.classList.add("list-element");
        follow_button.classList.add("follow-button");
        container_div.appendChild(follow_button);

        const button = document.createElement("button");
        button.classList.add("list-element");
        button.classList.add("list-button");
        container_div.appendChild(button);
        
        const first_div = document.createElement("div");
        first_div.classList.add("list-button-text");
        first_div.classList.add("col-4");
        button.appendChild(first_div);

        const second_div = document.createElement("div");
        second_div.classList.add("list-button-text");
        second_div.classList.add("col-4");
        button.appendChild(second_div);

        const third_div = document.createElement("div");
        third_div.classList.add("list-button-text");
        third_div.classList.add("col-4");
        button.appendChild(third_div);

        first_div.innerHTML = artist.albums[i].albumName;
        second_div.innerHTML = artist.albums[i].songs.length + " Songs";
        console.log("Time")
        console.log(artist);
        third_div.innerHTML = artist.artistName;

        button.onclick = function(){
            PopulateSongsForAlbum(artist.albums[i]);
        }


        if(IsFollowingAlbum(artist.albums[i].id)){
            follow_button.innerHTML = "&#9829;";
            follow_button.onclick = function(){

                var after = function(){
                    PopulateAlbumsForArtist(artist);
                }

                UnfollowAlbum(artist.albums[i].id, after);
            }
        }
        else{
            follow_button.innerHTML = "&#9825;";
            follow_button.onclick = function(){

                var after = function(){
                    PopulateAlbumsForArtist(artist);
                }

                FollowAlbum(artist.id, artist.albums[i].id, after);
            }
        }

    }
}



function PopulateSongsForAlbum(album){
    console.log("Album: " + album.albumName);

    PopulateContainerTitle(album.albumName, "Song Name", "From Album", "By Artist");

    var artist_container = document.getElementById("artist-container");
    artist_container.innerHTML = "";

    for(let i = 0; i < album.songs.length; i++){

        const container_div = document.createElement("div");
        container_div.classList.add("artist-element-container");
        artist_container.appendChild(container_div);

        const follow_button = document.createElement("button");
        follow_button.classList.add("list-element");
        follow_button.classList.add("follow-button");
        follow_button.innerHTML = "&#9825;";
        container_div.appendChild(follow_button);

        const button = document.createElement("button");
        button.classList.add("list-element");
        button.classList.add("list-button");
        container_div.appendChild(button);
        
        const first_div = document.createElement("div");
        first_div.classList.add("list-button-text");
        first_div.classList.add("col-4");
        button.appendChild(first_div);

        const second_div = document.createElement("div");
        second_div.classList.add("list-button-text");
        second_div.classList.add("col-4");
        button.appendChild(second_div);

        const third_div = document.createElement("div");
        third_div.classList.add("list-button-text");
        third_div.classList.add("col-4");
        button.appendChild(third_div);

        first_div.innerHTML = album.songs[i].songName;
        second_div.innerHTML = album.songs[i].albumName;
        third_div.innerHTML = album.songs[i].artistName;


        if(IsFollowingSong(album.songs[i].id)){
            follow_button.innerHTML = "&#9829;";
            follow_button.onclick = function(){

                var after = function(){
                    PopulateSongsForAlbum(album);
                }

                UnfollowSong(album.songs[i].id, after);
            }
        }
        else{
            follow_button.innerHTML = "&#9825;";
            follow_button.onclick = function(){

                var after = function(){
                    PopulateSongsForAlbum(album);
                }

                FollowSong(album.artistId, album.id, album.songs[i].id, after);
            }
        }

    }
}


function PopulateLikedArtists(){

    console.log(user_library)
    var url = apiURL + "/musicapi/user/artists?username=" + user_library.userName;

    $.get(url, function(data, status){

        console.log(data);

        PopulateContainerTitle("Discover Artists", "Artist Name", "Albums", "Songs");

        var artist_container = document.getElementById("artist-container");
        artist_container.innerHTML = "";
    
        for(let i = 0; i < data.length; i++){

            const container_div = document.createElement("div");
            container_div.classList.add("artist-element-container");
            artist_container.appendChild(container_div);

            const follow_button = document.createElement("button");
            follow_button.classList.add("list-element");
            follow_button.classList.add("follow-button");
            container_div.appendChild(follow_button);

            const button = document.createElement("button");
            button.classList.add("list-element");
            button.classList.add("list-button");
            container_div.appendChild(button);
            
            const first_div = document.createElement("div");
            first_div.classList.add("list-button-text");
            first_div.classList.add("col-4");
            button.appendChild(first_div);

            const second_div = document.createElement("div");
            second_div.classList.add("list-button-text");
            second_div.classList.add("col-4");
            button.appendChild(second_div);

            const third_div = document.createElement("div");
            third_div.classList.add("list-button-text");
            third_div.classList.add("col-4");
            button.appendChild(third_div);

            var artist = data[i];
            var songCount = 0;
            for(let j = 0; j < artist.albums.length; j++){
                songCount += artist.albums[j].songs.length;
            }

            first_div.innerHTML = artist.artistName;
            second_div.innerHTML = artist.albums.length + " Albums";
            third_div.innerHTML = songCount + " Songs";

            button.onclick = function(){
                PopulateAlbumsForArtist(data[i]);
            }

            if(IsFollowingArtist(data[i].id)){
                follow_button.innerHTML = "&#9829;";
                follow_button.onclick = function(){
                    UnfollowArtist(data[i].id, PopulateLikedArtists);
                }
            }
            else{
                follow_button.innerHTML = "&#9825;";
                follow_button.onclick = function(){
                    FollowArtist(data[i].id, PopulateLikedArtists);
                }
            }
        }

    });
}



function PopulateLikedAlbums(){

    console.log(user_library)
    
    PopulateContainerTitle("Liked Albums", "Album Name", "Songs", "By Artist");

    var artist_container = document.getElementById("artist-container");
    artist_container.innerHTML = "";

    for(let i = 0; i < user_library.likedAlbums.length; i++){

        const container_div = document.createElement("div");
        container_div.classList.add("artist-element-container");
        artist_container.appendChild(container_div);

        const follow_button = document.createElement("button");
        follow_button.classList.add("list-element");
        follow_button.classList.add("follow-button");
        container_div.appendChild(follow_button);

        const button = document.createElement("button");
        button.classList.add("list-element");
        button.classList.add("list-button");
        container_div.appendChild(button);
        
        const first_div = document.createElement("div");
        first_div.classList.add("list-button-text");
        first_div.classList.add("col-4");
        button.appendChild(first_div);

        const second_div = document.createElement("div");
        second_div.classList.add("list-button-text");
        second_div.classList.add("col-4");
        button.appendChild(second_div);

        const third_div = document.createElement("div");
        third_div.classList.add("list-button-text");
        third_div.classList.add("col-4");
        button.appendChild(third_div);

        first_div.innerHTML = user_library.likedAlbums[i].albumName;
        second_div.innerHTML = user_library.likedAlbums[i].songs.length + " Songs";
        third_div.innerHTML = user_library.likedAlbums[i].songs[0].artistName;

        button.onclick = function(){
            PopulateSongsForAlbum(user_library.likedAlbums[i]);
        }


        follow_button.innerHTML = "&#9829;";
        follow_button.onclick = function(){
            UnfollowAlbum(user_library.likedAlbums[i].id, PopulateLikedAlbums);
        }
    }
}




function PopulateLikedSongs(){

    console.log(user_library)
    
    PopulateContainerTitle("Liked Songs", "Song Name", "From Album", "By Artist");

    var artist_container = document.getElementById("artist-container");
    artist_container.innerHTML = "";

    for(let i = 0; i < user_library.likedSongs.length; i++){

        const container_div = document.createElement("div");
        container_div.classList.add("artist-element-container");
        artist_container.appendChild(container_div);

        const follow_button = document.createElement("button");
        follow_button.classList.add("list-element");
        follow_button.classList.add("follow-button");
        container_div.appendChild(follow_button);

        const button = document.createElement("button");
        button.classList.add("list-element");
        button.classList.add("list-button");
        container_div.appendChild(button);
        
        const first_div = document.createElement("div");
        first_div.classList.add("list-button-text");
        first_div.classList.add("col-4");
        button.appendChild(first_div);

        const second_div = document.createElement("div");
        second_div.classList.add("list-button-text");
        second_div.classList.add("col-4");
        button.appendChild(second_div);

        const third_div = document.createElement("div");
        third_div.classList.add("list-button-text");
        third_div.classList.add("col-4");
        button.appendChild(third_div);

        first_div.innerHTML = user_library.likedSongs[i].songName;
        second_div.innerHTML = user_library.likedSongs[i].albumName;
        third_div.innerHTML = user_library.likedSongs[i].artistName;


        follow_button.innerHTML = "&#9829;";
        follow_button.onclick = function(){
            UnfollowSong(user_library.likedSongs[i].id, PopulateLikedSongs);
        }
    }

}






function PopulateContainerTitle(title, first_col, second_col, third_col){
    var title_container = document.getElementById("category-title-container");
    var first_div = document.getElementById("first-col-title"); 
    var second_div = document.getElementById("second-col-title"); 
    var third_div = document.getElementById("third-col-title"); 

    title_container.innerHTML = title;
    first_div.innerHTML = first_col;
    second_div.innerHTML = second_col;
    third_div.innerHTML = third_col;
}


function LoginUser(username){

    var url = apiURL + "/musicapi/user/login?username=" + username;

    $.get(url, function(data, status){
        user_library = data;
        console.log(user_library);

        document.getElementById("user-title").innerHTML = username + "'s Library";

        PopulateArtistContainer();
    });
}


function IsFollowingArtist(id){
    return user_library.likedArtistIds.some(function(artistId){
        return artistId == id;
    });
}

function IsFollowingAlbum(id){
    return user_library.likedAlbums.some(function(album){
        return album.id == id;
    });
}

function IsFollowingSong(id){
    return user_library.likedSongs.some(function(song){
        return song.id == id;
    });
}


function FollowArtist(id, after){
    var url = apiURL + "/musicapi/user/artists?username=" + user_library.userName + "&artistId=" + id;

    console.log("Following!");


    $.ajax({
        type: 'PUT',
        url: url,
        contentType: 'application/json',
        data: "", 
    }).done(function (result) {
        console.log('SUCCESS');
        console.log(result);
        user_library = result;
        after();
    }).fail(function (msg) {
        console.log('Failed to like artist');
    });
}


function UnfollowArtist(id, after){
    var url = apiURL + "/musicapi/user/artists?username=" + user_library.userName + "&artistId=" + id;

    console.log("Unfollowing!");

    $.ajax({
        type: 'DELETE',
        url: url,
        contentType: 'application/json',
        data: "", 
    }).done(function (result) {
        console.log('SUCCESS');
        console.log(result);
        user_library = result;
        after();
    }).fail(function (msg) {
        console.log('Failed to like artist');
    });
}


function FollowAlbum(artistId, albumId, after){
    var url = apiURL + "/musicapi/user/albums?username=" + user_library.userName + "&artistId=" + artistId + "&albumId=" + albumId

    console.log("Following!");

    $.ajax({
        type: 'PUT',
        url: url,
        contentType: 'application/json',
        data: "", 
    }).done(function (result) {
        console.log('SUCCESS');
        console.log(result);
        user_library = result;
        after();
    }).fail(function (msg) {
        console.log('Failed to like album');
    });
}


function UnfollowAlbum(albumId, after){
    var url = apiURL + "/musicapi/user/albums?username=" + user_library.userName + "&albumId=" + albumId;

    console.log("Unfollowing!");

    $.ajax({
        type: 'DELETE',
        url: url,
        contentType: 'application/json',
        data: "", 
    }).done(function (result) {
        console.log('SUCCESS');
        console.log(result);
        user_library = result;
        after();
    }).fail(function (msg) {
        console.log('Failed to like album');
    });
}


function FollowSong(artistId, albumId, songId, after){
    var url = apiURL + "/musicapi/user/songs?username=" + user_library.userName + "&artistId=" + artistId + "&albumId=" + albumId + "&songId=" + songId;

    console.log("Following!");

    $.ajax({
        type: 'PUT',
        url: url,
        contentType: 'application/json',
        data: "", 
    }).done(function (result) {
        console.log('SUCCESS');
        console.log(result);
        user_library = result;
        after();
    }).fail(function (msg) {
        console.log('Failed to like album');
    });
}


function UnfollowSong(songId, after){
    var url = apiURL + "/musicapi/user/songs?username=" + user_library.userName + "&songId=" + songId;

    console.log("Unfollowing!");

    $.ajax({
        type: 'DELETE',
        url: url,
        contentType: 'application/json',
        data: "", 
    }).done(function (result) {
        console.log('SUCCESS');
        console.log(result);
        user_library = result;
        after();
    }).fail(function (msg) {
        console.log('Failed to like album');
    });
}




function InitSideMenu(){
    document.getElementById("discover-button").onclick = function(){
        PopulateArtistContainer();
    };
    document.getElementById("liked-artist-button").onclick = function(){
        PopulateLikedArtists();
    };
    document.getElementById("liked-album-button").onclick = function(){
        PopulateLikedAlbums();
    };
    document.getElementById("liked-song-button").onclick = function(){
        PopulateLikedSongs();
    };
}


document.addEventListener("DOMContentLoaded", function(){

    let username = prompt('Enter Login');
    InitSideMenu();
    LoginUser(username);

});
