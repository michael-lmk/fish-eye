//savegarde des données pour ne pas devoir refaire la requete
let currentIndexImg = 0;

function sort_by_likes (a,b) {
    return a._likes - b._likes;
}

 function sort_by_date (a,b){
    return new Date(b._date) - new Date(a._date);
}

 function sort_by_title (a,b){
    return a._title.localeCompare(b._title);
}


function previousPicture() {

    if (currentIndexImg === app.currentPhotographer._media.length-1) {
        currentIndexImg = 0;
    }else{
        currentIndexImg++;
    }

    if (app.currentPhotographer._media[currentIndexImg]._image) {
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${app.currentPhotographer._id}/${app.currentPhotographer._media[currentIndexImg]._image}" alt="">`;
    }else{
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
            <video class="current_picture" controls width="250">
                <source src="../img/${app.currentPhotographer._id}/${app.currentPhotographer._media[currentIndexImg]?._video}" type="video/mp4">

                Sorry, your browser doesn't support embedded videos.
            </video>`;
    }
}


function nextPicture() {

    if (currentIndexImg === 0) {
        currentIndexImg = app.currentPhotographer._media.length-1;
    }else{
        currentIndexImg--;
    }

    if (app.currentPhotographer._media[currentIndexImg]._image) {
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${app.currentPhotographer._id}/${app.currentPhotographer._media[currentIndexImg]._image}" alt="">`;
    }else{
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
            <video class="current_picture" controls width="250">
                <source src="../img/${app.currentPhotographer._id}/${app.currentPhotographer._media[currentIndexImg]?._video}" type="video/mp4">

                Sorry, your browser doesn't support embedded videos.
            </video>`;
    }
}

