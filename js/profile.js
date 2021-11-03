const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('i');


async function get_data_medias() {

    const response = await fetch('../json/data.json');
    const datas = await response.json();

    const mediasOfUser = datas.media.filter(element => element.photographerId == userId);
    
    return mediasOfUser;
    
}

//Recupere les information du profil
async function get_data_photographer() {

    const response = await fetch('../json/data.json');
    const datas = await response.json();

    const user_info = datas.photographers.filter(element => element.id == userId );

    return user_info[0];
    
}


async function get_data_profile() {
    
    const medias = await get_data_medias();
    const user_info = await get_data_photographer();

    return { "media": medias, "user":user_info }
    
}

async function send_to_html() {
    const objetData = await get_data_profile();

    // Ajout du profile dans le html 
    document.getElementById("name").innerText = objetData.user.name ;
    document.getElementById("img").src = '/img/Photographers ID Photos/'+objetData.user.portrait; 
    document.getElementById("city").innerText = objetData.user.city+", "+objetData.user.country;
    document.getElementById("tagline").innerText = objetData.user.tagline;

    const tagsDOM = document.getElementsByClassName("tags")[0];
    const tagsArray = objetData.user.tags;

    for (let index = 0; index < tagsArray.length; index++) {
        const tag = tagsArray[index];
        tagsDOM.innerHTML += `<a href="">#${tag}</a>`

    }

    // Ajout des photos dans le html 
    const medias = objetData.media;  
    const mediasDom = document.getElementById("album");

    for (let index = 0; index < medias.length; index++) {
        const media = medias[index];
        
        mediasDom.innerHTML += `
            <div class="picture_container">
                <img class="picture" src="../img/${objetData.user.id}/${media.image || media.video}" class="album_img" alt="">
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
            console.log(mediasDom);
    //    mediasDom.getElementsByClassName("picture_container")[index].style.cssText += "width: 5em;height: 5em;"
    }


// const style = document.createElement('style');
// style.innerHTML = `
//       .picture_container {
//         width: 5em;
//         height: 5em;
//       }
//     `;
// document.head.appendChild(style);
}

send_to_html();