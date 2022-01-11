class Media {
    constructor(data){
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._tags = data.tags;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._alt_text = data.alt_text;
        this.mediasDom = document.getElementById("album");
    }

    build_card () {
        // count_likes += media.likes;
        
        var element = document.createElement("div");
        element.setAttribute("class", "picture_container" )

        element.innerHTML += `
            
            <button class="open_visu"  data-id="${this._id}">
            ${
                this._image?
                    `<img class="picture" src="../img/${this._photographerId}/${this._image}" class="album_img" alt="${this._alt_text}"  />`
                :
                    `<video  class="picture" controls data-id="${this._id}" preload="metadata">
                        <source src="../img/${this._photographerId}/${this._video}#t=1" type="video/mp4" ">

                        Sorry, your browser doesn't support embedded videos.
                    </video>`
            }
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

    img_event_click (element) {

        element.getElementsByClassName("open_visu")[0].addEventListener("click", (event) => {
            event.preventDefault();
            document.getElementById("visualisation").style.display = "block";
            document.getElementsByClassName("next")[0].focus();
            
            // let dataId = event.currentTarget.getAttribute("data-id");

            if (this._image) {
                document.getElementsByClassName("container_ligthbox")[0].innerHTML = `<img class="current_picture" src="../img/${this._photographerId}/${this._image}" alt="${this._alt_text}">`;
            }else{
                document.getElementsByClassName("container_ligthbox")[0].innerHTML = `
                    <video class="current_picture" controls>
                        <title>${this._title}</title>
                        <source src="../img/${this._photographerId}/${this._video}" type="video/mp4">
        
                        Sorry, your browser doesn't support embedded videos.
                    </video>`;
            }
            
        });
        
    }

    
    increase_likes (element) {
        const likesDom = element.getElementsByClassName("container_likes")[0];

        likesDom.addEventListener("click", (event) => {
            event.preventDefault();
            let element = likesDom.getElementsByClassName("nb_likes")[0];
            var nb = parseInt(element.innerHTML);
            nb+=1;
            element.innerHTML = nb;

            document.getElementById("total_likes").innerHTML = parseInt(document.getElementById("total_likes").innerHTML)+1;
        });
        
        
    }
}
