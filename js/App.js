const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sort = urlParams.get('tag');
const photographerId = urlParams.get('i');
var currentLocation = window.location.pathname ;

class App {
    constructor() {
        this.$indexMain = document.querySelector('#main');
        this.selectInputDom = document.getElementById("sort_input");
        this.PhotographerApi = new PhotographerApi('/json/data.json');
        
    }

    async index() {
        
        // je récupère les data de mon fichier 
        const PhotographersData = await this.PhotographerApi.getPhotographers();
        
        // je transforme mon tableau de données en un tableau de classe 
        PhotographersData.map(async element => {
            
            var photographer = new Photographer(element);
            
            if (sort && !photographer.tags.includes(sort)) {
                console.log("ne pas affiché.", "sort :", sort, ", name: ",this._name );
            } else {
                this.$indexMain.appendChild(
                    photographer.build_card()
                )
            }
            
        })
    }
    
    async profile() {
        var photographerData = await this.PhotographerApi.getOnce(photographerId);
        var photographer = new Photographer(photographerData);

        // Ajout du profile dans le html 
        document.getElementById("name").innerText = photographer.name ;
        document.getElementById("img").src = '/img/photo_profile/'+photographer.portrait; 
        document.getElementById("city").innerText = photographer.city+", "+photographer.country;
        document.getElementById("tagline").innerText = photographer.tagline;
        document.getElementById("price").innerHTML = photographer.price + "€ / jour";

        const tagsDOM = document.getElementsByClassName("tags")[0];
        const tagsArray = photographer.tags;

        for (let index = 0; index < tagsArray.length; index++) {
            const tag = tagsArray[index];
            tagsDOM.innerHTML += `<a href="index.html?tag=${tag}">#${tag}</a>`
        }
        
        //Album
        const media = await this.PhotographerApi.getMediasByPhotographer(photographer.id);
        
        switch (this.selectInputDom) {
            case "2":
                media.sort(sort_by_date)
                break;
            case "3":
                media.sort(sort_by_title)  
                break;
            default:
                media.sort(sort_by_likes)
                break;
        }

        photographer.media = media.map((media) => {
            var mediaInstance = new Media(media)
            
            mediaInstance.build_card();
        }); 

    }
}

const app = new App();

switch (currentLocation) {
    case "/index.html":
        app.index();
        break;
    case "/profile.html":
        app.profile();
        break;

    default:
        app.index();
        break;
}
