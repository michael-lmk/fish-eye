class Media {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._tags = data.tags;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._alt_text = data.alt_text;
    this.mediasDom = document.getElementById("album");
  }

  img_event_click(element) {
    element
      .getElementsByClassName("open_visu")[0]
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("visualisation").style.display = "block";
        document.getElementsByClassName("next")[0].focus();

        let dataId = event.currentTarget.getAttribute("data-id");

        currentIndexImg = app.currentPhotographer._media.findIndex(
          (element) => dataId == element._id
        );

        if (this._image) {
          document.getElementsByClassName(
            "container_ligthbox"
          )[0].innerHTML = `<img class="current_picture" src="../img/${this._photographerId}/${this._image}" alt="${this._alt_text}">`;
        } else {
          document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
                    <video class="current_picture" controls>
                        <title>${this._title}</title>
                        <source src="../img/${this._photographerId}/${this._video}" type="video/mp4">
        
                        Sorry, your browser doesn't support embedded videos.
                    </video>`;
        }
      });
  }

  increase_likes(element) {
    const likesDom = element.getElementsByClassName("container_likes")[0];

    likesDom.addEventListener("click", (event) => {
      event.preventDefault();
      let element = likesDom.getElementsByClassName("nb_likes")[0];
      var nb = parseInt(element.innerHTML);
      nb += 1;
      element.innerHTML = nb;

      document.getElementById("total_likes").innerHTML =
        parseInt(document.getElementById("total_likes").innerHTML) + 1;
    });
  }

  static clear_dom_element() {
    document.getElementById("album").innerHTML = "";
  }
}
