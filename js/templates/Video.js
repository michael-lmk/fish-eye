class Video extends Media{
  constructor(data){
    super(data)
    this._video = data.video;
  }

  build_card() {

    var element = document.createElement("div");
    element.setAttribute("class", "picture_container");

    element.innerHTML += `
      <button class="open_visu"  data-id="${this._id}">
        <video  class="picture" controls data-id="${this._id}" preload="metadata">
            <source src="../img/${this._photographerId}/${this._video}#t=1" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
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