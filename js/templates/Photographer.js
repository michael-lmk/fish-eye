class Photographer {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._city = data.city;
    this._country = data.country;
    this._tags = data.tags;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
    this._media = [];
    this.totalLikes = 0;
  }

  build_card() {
    //si le parametre existe et que le tag n'est pas inclus dans le profil on ne l'affiche pas

    const $wrapper = document.createElement("article");
    $wrapper.setAttribute("data-id", this._id);

    let html = `
            <a class="link" href="./profile.html?i=${this._id}">
                <div class="container_img">
                    <img src="./img/photo_profile/${this._portrait}" alt="Photo du photographe ${this._name}">
                </div>
                <h2>${this._name}</h2>
            </a>
            <h3>${this._city}, ${this._country}</h3>
            <p>${this._tagline}</p>
            <p>${this._price}€/jour</p>
            <ul class="tags" aria-label="Navigation Secondaire">`;

    for (let index = 0; index < this._tags.length; index++) {
      const element = this._tags[index];
      html += `<li><a class="sort_by_tag ${element}" href="index.html?tag=${element}">#${element}</a></li>`;
    }

    html += `</ul>
        `;
    $wrapper.innerHTML = html;

    return $wrapper;
  }

}



