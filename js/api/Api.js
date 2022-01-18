class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
     
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log('an error occurs', err))
    }
    
    async getOnce(id) {
     
        return fetch(this._url)
            .then(res => res.json())
            .then((res) =>{ 
                return res.photographers.find(e => e.id == id)
            })
            .catch(err => console.log('an error occurs', err))
    }
}


class PhotographerApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        var res = await this.get()
        return res.photographers
    }
   
    async getPhotographer(id) {
        var res = await this.getOnce(id)
        return res;
    }

    async getMediasByPhotographer(photographerId) {
        var res = await this.get();
        var mediaOfPhotographer =  [];

        for (let index = 0; index < res.media.length; index++) {
            const element = res.media[index];
            if (element.photographerId === photographerId) {
                
                mediaOfPhotographer.push(element);
            }
        }
   
        return mediaOfPhotographer;
    }
}

class MediaApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getMedias() {
        var res = await this.get();
        return res.media
    }
    
    
}
