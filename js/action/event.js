const selectInputDom = document.getElementById("sort_input");
const btnContactDom = document.getElementById("btn_contact_form");
const btnContactClose = document.getElementById("close_form");
const btnCloseLightbox = document.getElementById("close_form_2");
const imagesDom = document.getElementsByClassName("open_visu");
const sendMsgForm = document.getElementsByClassName("send_msg")[0];


document.getElementsByClassName("next")[0].addEventListener("click", () => {
  nextPicture();
});
document.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" ? nextPicture() : null;
});

document
  .getElementsByClassName("previous")[0]
  .addEventListener("click", previousPicture);
document.addEventListener("keydown", (e) => {
  e.key === "ArrowRight" ? previousPicture() : null;
});

selectInputDom.addEventListener("change", (e) => {
  console.log(e.target.value);
  var funcSort = () => {};
  switch (e.target.value) {
    case "1": funcSort = sort_by_likes; break;
    case "2": funcSort = sort_by_date; break;
    case "3": funcSort = sort_by_title; break;
    default: break;
  }

  app.currentPhotographer._media.sort(funcSort);
  
  Media.clear_dom_element();

  app.currentPhotographer._media.map((media) => {
    media.build_card();
  });
});

btnContactDom.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("contact_form").style.display = "flex";
  document.getElementById("close_form").focus();
  document.getElementById("photographer_name").innerText =
    app.currentPhotographer._name;
});

btnContactClose.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contact_form").style.display = "none";
});

btnCloseLightbox.addEventListener("click", () => {
  document.getElementById("visualisation").style.display = "none";
});

document.addEventListener("keydown", (e) => {
  e.key === "Escape"
    ? (document.getElementById("visualisation").style.display = "none")
    : null;
});

sendMsgForm.addEventListener("click", (e) => {
  e.preventDefault();
  var results = [];
  var formData = document.querySelectorAll(
    "#form_body input, #form_body textarea"
  );

  formData.forEach((element) => {
    results[element.id] = element.value;
  });
  console.log(results);
  document.getElementById("contact_form").style.display = "none";
});
