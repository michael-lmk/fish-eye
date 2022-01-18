const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sort = urlParams.get('tag');
const photographerId = urlParams.get('i');
var currentLocation = window.location.pathname ;
//savegarde des données pour ne pas devoir refaire la requete
// let currentPhotographer;
// let currentIndexImg = 0;

class App {
    constructor() {
        this.$indexMain = document.querySelector('#main');
        this.selectInputDom = document.getElementById("sort_input");
        this.PhotographerApi = new PhotographerApi('/json/data.json');
        this.currentPhotographer = Photographer;
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
        this.currentPhotographer = new Photographer(photographerData);

        //Album
        const media = await this.PhotographerApi.getMediasByPhotographer(this.currentPhotographer._id);

        // Ajout du profile dans le html 
        document.getElementById("name").innerText = this.currentPhotographer._name ;
        document.getElementById("img").src = '/img/photo_profile/'+this.currentPhotographer._portrait; 
        document.getElementById("city").innerText = this.currentPhotographer._city+", "+this.currentPhotographer._country;
        document.getElementById("tagline").innerText = this.currentPhotographer._tagline;
        document.getElementById("price").innerHTML = this.currentPhotographer._price + "€ / jour";

        const tagsDOM = document.getElementsByClassName("tags")[0];
        const tagsArray = this.currentPhotographer._tags;

        for (let index = 0; index < tagsArray.length; index++) {
            const tag = tagsArray[index];
            tagsDOM.innerHTML += `<a href="index.html?tag=${tag}">#${tag}</a>`
        }

        media.sort(sort_by_likes);

        // switch (this.selectInputDom) {
        //     case "2":
        //         media.sort(sort_by_date)
        //         break;
        //     case "3":
        //         media.sort(sort_by_title)  
        //         break;
        //     default:
        //         media.sort(sort_by_likes)
        //         break;
        // }

        this.currentPhotographer._media = media.map((media) => {
            var mediaInstance = new Media(media)
            mediaInstance.build_card();
            return mediaInstance
        })

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
