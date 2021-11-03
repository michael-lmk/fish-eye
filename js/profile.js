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

    document.getElementById("name").innerText = objetData.user.name ;
    document.getElementById("img").src = '/img/Photographers ID Photos/'+objetData.user.portrait; 
    document.getElementById("city").innerText = objetData.user.city+", "+objetData.user.country;

    const tagsDOM = document.getElementsByClassName("tags");
    const tagsArray = objetData.user.tags;
    for (let index = 0; index < tagsArray.length; index++) {
        const tag = tagsArray[index];
        tagsDOM.innerHTML += `<a href="">#${tag}</a>`

    }
    
}
