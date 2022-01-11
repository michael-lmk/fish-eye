// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const userId = urlParams.get('i');
const selectInputDom = document.getElementById("sort_input");
const btnContactDom = document.getElementById('btn_contact_form');
const btnContactClose = document.getElementById('close_form');
const btnCloseLightbox = document.getElementById('close_form_2');
const imagesDom = document.getElementsByClassName("open_visu");
const sendMsgForm = document.getElementsByClassName("send_msg")[0];


document.getElementsByClassName("next")[0].addEventListener( "click", nextPicture() );
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