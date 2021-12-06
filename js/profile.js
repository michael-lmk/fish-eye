const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('i');
const selectInputDom = document.getElementById("sort_input");
const btnContactDom = document.getElementById('btn_contact_form');
const btnContactClose = document.getElementById('close_form');
const btnCloseLightbox = document.getElementById('close_form_2');
const imagesDom = document.getElementsByClassName("open_visu");
const sendMsgForm = document.getElementsByClassName("send_msg")[0];

//savegarde des données pour ne pas devoir refaire la requete
let saveUser = {};
let albumMediaSave = [];
let currentIndexImg = 0;




function sort_by_likes (a,b) {
    return a.likes - b.likes;
}

function sort_by_date (a,b){
    return new Date(b.date) - new Date(a.date);
}

function sort_by_title (a,b){
   
    return a.title.localeCompare(b.title);
}

// Recupere les donnée des images d'album
async function get_data_medias(order_by) {

    const response = await fetch('../json/data.json');
    const datas = await response.json();

    const mediasOfUser = datas.media.filter(element => element.photographerId == userId);

    if (order_by) {
        mediasOfUser.sort(order_by);
    }
   
    albumMediaSave = mediasOfUser;

    return mediasOfUser;
    
}

//Recupere les information du profil
async function get_data_photographer() {

    const response = await fetch('../json/data.json');
    const datas = await response.json();

    const user_info = datas.photographers.filter(element => element.id == userId );

    return user_info[0];
    
}

// envoie les données du profil
async function send_Profile_to_html() {
    const user = await get_data_photographer();

    saveUser = user;

    // Ajout du profile dans le html 
    document.getElementById("name").innerText = user.name ;
    document.getElementById("img").src = '/img/photo_profile/'+user.portrait; 
    document.getElementById("city").innerText = user.city+", "+user.country;
    document.getElementById("tagline").innerText = user.tagline;
    document.getElementById("price").innerHTML = user.price + "€ / jour";

    const tagsDOM = document.getElementsByClassName("tags")[0];
    const tagsArray = user.tags;

    for (let index = 0; index < tagsArray.length; index++) {
        const tag = tagsArray[index];
        tagsDOM.innerHTML += `<a href="index.html?tag=${tag}">#${tag}</a>`

    }

}

// envoie les données des albums
async function send_media_to_html (orderParam) {
   
    let order_by;
    switch (orderParam) {
        case "2":
            order_by = sort_by_date  
            break;
        case "3":
            order_by = sort_by_title  
            break;
        default:
            order_by = sort_by_likes
            break;
    }
    
    const medias = await get_data_medias(order_by);

    // Ajout des photos dans le html   
    const mediasDom = document.getElementById("album");
    mediasDom.innerHTML = "";
    
    // total de likes sur l'album
    let count_likes = 0;
   
    for (let index = 0; index < medias.length; index++) {
        const media = medias[index];
        
        count_likes += media.likes;

        mediasDom.innerHTML += `
            <div class="picture_container">
            <button class="open_visu"  data-id="${media.id}">
            ${
                media.image?
                    `<img class="picture" src="../img/${media.photographerId}/${media.image}" class="album_img" alt="titre de la photo : ${media.title}"  />`
                :
                    `<video  class="picture" controls data-id="${media.id}" preload="metadata">
                        <source src="../img/${media.photographerId}/${media.video}#t=1" type="video/mp4" ">

                        Sorry, your browser doesn't support embedded videos.
                    </video>`
            }
            </button>
                <div class="desc">
                    <p class="media_title">${media.title}</p>
                    <button class="container_likes">
                        <p class="nb_likes">${media.likes}</p>
                        <div class="svg_container">
                           <img src="../img/likes.svg" alt="likes">
                        </div>
                    </button>
                </div>
            </div>
        `;
       
    }

    document.getElementById("total_likes").innerHTML = count_likes;
    
}



function increase_likes () {
    const likesDom = document.getElementsByClassName("container_likes");

    for (let index = 0; index < likesDom.length; index++) {
    
        likesDom[index].addEventListener("click", () => {
            let element = likesDom[index].getElementsByClassName("nb_likes")[0];
            nb = parseInt(element.innerHTML);
            nb+=1;
            element.innerHTML = nb;

            document.getElementById("total_likes").innerHTML = parseInt(document.getElementById("total_likes").innerHTML)+1;
        });
    
    }
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
                document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${userId}/${albumMediaSave[currentIndexImg].image}" alt="Titre de la photo : ${albumMediaSave[currentIndexImg].title}">`;
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

function previousPicture() {
    console.log();
    if (currentIndexImg === albumMediaSave.length-1) {
        currentIndexImg = 0;
    }else{
        currentIndexImg++;
    }

    if (albumMediaSave[currentIndexImg].image) {
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${userId}/${albumMediaSave[currentIndexImg].image}" alt="">`;
    }else{
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
            <video class="current_picture" controls width="250">
                <source src="../img/${userId}/${albumMediaSave[currentIndexImg].video}" type="video/mp4">

                Sorry, your browser doesn't support embedded videos.
            </video>`;
    }
}


function nextPicture() {
     
    if (currentIndexImg === 0) {
        currentIndexImg = albumMediaSave.length-1;
    }else{
        currentIndexImg--;
    }

    if (albumMediaSave[currentIndexImg].image) {
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${userId}/${albumMediaSave[currentIndexImg].image}" alt="">`;
    }else{
        document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
            <video class="current_picture" controls  autoplay="true">
                <source src="../img/${userId}/${albumMediaSave[currentIndexImg].video}" type="video/mp4">

                Sorry, your browser doesn't support embedded videos.
            </video>`;
    }
}

function send_msg () {
    
}


//Ecouteur d'evenement
document.getElementsByClassName("next")[0].addEventListener( "click", nextPicture );
document.addEventListener("keydown", (e) => { e.key === "ArrowLeft"? nextPicture() : null });

document.getElementsByClassName("previous")[0].addEventListener("click", previousPicture);
document.addEventListener("keydown", (e) => {e.key === "ArrowRight"? previousPicture() : null});

selectInputDom.addEventListener("change", () => {
    
    send_media_to_html(selectInputDom.value).then(() => {
        increase_likes();
        img_event_click();
    });
})


btnContactDom.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("contact_form").style.display = "flex";
    document.getElementById("photographer_name").innerText = saveUser.name;
})

btnContactClose.addEventListener("click", () => {
    document.getElementById("contact_form").style.display = "none";
})

btnCloseLightbox.addEventListener("click", () => {
    document.getElementById("visualisation").style.display = "none";
})

document.addEventListener("keydown", (e) => {
    e.key === "Escape" ? document.getElementById("visualisation").style.display = "none" : null ;
})

sendMsgForm.addEventListener("click", (e) => {
    e.preventDefault();
    var results = [];
    var formData = document.querySelectorAll('#form_body input, #form_body textarea');
    
    formData.forEach((element) => {
        results[element.id] =  element.value;
    })
    
    console.log(results); 
    
})


send_media_to_html().then(() => {
    increase_likes();
    img_event_click();
});

send_Profile_to_html();