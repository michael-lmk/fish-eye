class photographer {

    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tags = data.tags;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
    }

    get id() {
        return this._id
    }
    get name() {
        return this._name;
    }
    get city() {
        return this._city
    }
    get country() {
        return this._country
    }
    get tags() {
        return this._tags
    }
    get tagline() {
        return this._tagline
    }
    get price() {
        return this._price
    }
    get portrait() {
        return this._portrait
    }
    
    

    build_card (sort) {
    
        // recuperation des photographes 
        const datas = await get_data_photographers();
    
        // On vide la div avant de la remplir pour evité tout doublon
        document.getElementById("main").innerHTML = "";
    
        for (let index_1 = 0; index_1 < datas.length; index_1++) {
            const data = datas[index_1];
            let html = "";
    
            //si le parametre existe et que le tag n'est pas inclus dans le profil on ne l'affiche pas 
            if (sort && !data.tags.includes(sort)) {
                console.log("ne pas affiché.", "sort :", sort, ", name: ",data.name );
            } else {
                html = `
                <article data-id="${data.id}">
                    <a class="link" href="./profile.html?i=${data.id}">
                        <div class="container_img">
                            <img src="./img/photo_profile/${data.portrait}" alt="Photo du photographe">
                        </div>
                        <h2>${data.name}</h2>
                    </a>
                    <h3>${data.city}, ${data.country}</h3>
                    <p>${data.tagline}</p>
                    <p>${data.price}€/jour</p>
                    <ul class="tags" aria-label="Navigation Secondaire">`;
    
                for (let index = 0; index < data.tags.length; index++) {
                    const element = data.tags[index];
                    html+= `<li><a class="sort_by_tag ${element}" href="">#${element}</a></li>`;
                }
    
                html +=`</ul>
                </article>
                `;
                document.getElementById("main").innerHTML += html;
            }
          
            
          
        }
        
        appendEvent();
        
    }

    // Place les évenements "click" sur les tags
    appendEvent() {
        const tags_DOM = document.getElementsByClassName("sort_by_tag");

        for (let index = 0; index < tags_DOM.length; index++) {
            const element = tags_DOM[index];
            element.addEventListener("click", (e) => {
                e.preventDefault();
                
                e.target.setAttribute("aria-current", "page");

                build_card(element.innerText.slice(1));
                history.pushState(null, null, "/index.html");
            })
        }
    
    }
}