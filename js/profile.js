const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('i');
const selectInputDom = document.getElementById("sort_input");



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

    mediasOfUser.sort(order_by);
    
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

    // Ajout du profile dans le html 
    document.getElementById("name").innerText = user.name ;
    document.getElementById("img").src = '/img/Photographers ID Photos/'+user.portrait; 
    document.getElementById("city").innerText = user.city+", "+user.country;
    document.getElementById("tagline").innerText = user.tagline;
    document.getElementById("price").innerHTML = user.price + "€ / jour";

    const tagsDOM = document.getElementsByClassName("tags")[0];
    const tagsArray = user.tags;

    for (let index = 0; index < tagsArray.length; index++) {
        const tag = tagsArray[index];
        tagsDOM.innerHTML += `<a href="">#${tag}</a>`

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
            ${
                media.image?
                    `<img class="picture" src="../img/${media.photographerId}/${media.image}" class="album_img" alt=""></img>`
                :
                    `<video class="picture" controls width="250">
                        <source src="../img/${media.photographerId}/${media.video}" type="video/mp4">

                        Sorry, your browser doesn't support embedded videos.
                    </video>`
            }
                
                <div class="desc">
                    <p class="media_title">${media.title}</p>
                    <div class="container_likes">
                        <p class="nb_likes">${media.likes}</p>
                        <div class="svg_container">
                            <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:ns1="http://sozi.baierouge.fr" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg2" viewBox="0 0 720 720" version="1.0" inkscape:version="0.91 r13725">
                                <g id="layer1">
                                    <path id="path2433" style="fill:#901C1C" d="m180 45c-99.36 0-180 80.64-180 180 0 47.8 18.66 91.26 49.094 123.5l309.91 326.5 315.34-329.31c31.32-38.01 41.85-70.21 45.66-120.69 0-99.36-80.64-180-180-180-91.55 0-167.21 68.48-178.53 156.97h-2.94c-11.32-88.49-86.98-156.97-178.53-156.97z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
            
    }

    document.getElementById("total_likes").innerHTML = count_likes+`<div class="svg_container svg_dir_row">
                            <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:ns1="http://sozi.baierouge.fr" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg2" viewBox="0 0 720 720" version="1.0" inkscape:version="0.91 r13725">
                                <g id="layer1">
                                    <path id="path2433" style="fill:#000000" d="m180 45c-99.36 0-180 80.64-180 180 0 47.8 18.66 91.26 49.094 123.5l309.91 326.5 315.34-329.31c31.32-38.01 41.85-70.21 45.66-120.69 0-99.36-80.64-180-180-180-91.55 0-167.21 68.48-178.53 156.97h-2.94c-11.32-88.49-86.98-156.97-178.53-156.97z"/>
                                </g>
                            </svg>
                        </div>`;
    
}

// relance la fonction d'affichage de l'album en changant le tri
selectInputDom.addEventListener("change", () => {
    
    send_media_to_html(selectInputDom.value);
})


send_media_to_html();
send_Profile_to_html();