class Picture extends Media{
  constructor(data){
    super(data)
    this._image = data.image;
  }

  build_card() {
    // count_likes += media.likes;

    var element = document.createElement("div");
    element.setAttribute("class", "picture_container");

    element.innerHTML += `
      <button class="open_visu"  data-id="${this._id}">
        <img class="picture" src="../img/${this._photographerId}/${this._image}" class="album_img" alt="${this._alt_text}"  />
      </button>
      <div class="desc">
          <p class="media_title">${this._title}</p>
          <button class="container_likes">
              <p class="nb_likes">${this._likes}</p>
              <div class="svg_container">
                  <img src="../img/likes.svg" alt="likes">
              </div>
          </button>
      </div>
    `;

    this.mediasDom.appendChild(element);
    this.increase_likes(element);
    this.img_event_click(element);
  }
}