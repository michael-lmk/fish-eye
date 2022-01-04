const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sort = urlParams.get('tag');

class App {
    constructor() {
        this.$indexMain = document.querySelector('#main');
        this.PhotographerApi = new PhotographerApi('/json/data.json');
    }

    async main() {
        // Ici je récupère les data de mon fichier 
        const PhotographersData = await this.PhotographerApi.getPhotographers();

        PhotographersData
            // Ici, je transforme mon tableau de données en un tableau de classe 
            .map(element => {
                
                var photographer = new Photographer(element)

                if (sort && !photographer.tags.includes(sort)) {
                    console.log("ne pas affiché.", "sort :", sort, ", name: ",this._name );
                } else {
                    this.$indexMain.appendChild(
                        photographer.build_card()
                    )
                }
            })
    }
}

const app = new App()
app.main()