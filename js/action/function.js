function sort_by_likes (a,b) {
    return a.likes - b.likes;
}

 function sort_by_date (a,b){
    return new Date(b.date) - new Date(a.date);
}

 function sort_by_title (a,b){
    return a.title.localeCompare(b.title);
}


function previousPicture() {
   
    // if (currentIndexImg === albumMediaSave.length-1) {
    //     currentIndexImg = 0;
    // }else{
    //     currentIndexImg++;
    // }
    // console.log(albumMediaSave[currentIndexImg]);
    // if (albumMediaSave[currentIndexImg].image) {
    //     document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${userId}/${albumMediaSave[currentIndexImg]?.image}" alt="">`;
    // }else{
    //     document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
    //         <video class="current_picture" controls width="250">
    //             <source src="../img/${userId}/${albumMediaSave[currentIndexImg]?.video}" type="video/mp4">

    //             Sorry, your browser doesn't support embedded videos.
    //         </video>`;
    // }
}


function nextPicture() {
     
    // if (currentIndexImg === 0) {
    //     currentIndexImg = albumMediaSave.length-1;
    // }else{
    //     currentIndexImg--;
    // }

    // if (albumMediaSave[currentIndexImg]?.image) {
    //     document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${userId}/${albumMediaSave[currentIndexImg].image}" alt="">`;
    // }else{
    //     document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
    //         <video class="current_picture" controls  autoplay="true">
    //             <source src="../img/${userId}/${albumMediaSave[currentIndexImg]?.video}" type="video/mp4">

    //             Sorry, your browser doesn't support embedded videos.
    //         </video>`;
    // }
}

async function img_event_click () {
    

    for (let index = 0; index < imagesDom.length; index++) {
    
        imagesDom[index].addEventListener("click", (event) => {
            event.preventDefault();
            document.getElementById("visualisation").style.display = "block";
            document.getElementsByClassName("next")[0].focus();
            
            let dataId = event.currentTarget.getAttribute("data-id");
           
            currentIndexImg = albumMediaSave.findIndex((element) => dataId == element.id);

            if (albumMediaSave[currentIndexImg].image) {
                document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${userId}/${albumMediaSave[currentIndexImg].image}" alt="${albumMediaSave[currentIndexImg]["alt_text"]}">`;
            }else{
                document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
                    <video class="current_picture" controls>
                        <title>${albumMediaSave[currentIndexImg].title}</title>
                        <source src="../img/${userId}/${albumMediaSave[currentIndexImg].video}" type="video/mp4">
        
                        Sorry, your browser doesn't support embedded videos.
                    </video>`;
            }
            
        });
    
    }
}