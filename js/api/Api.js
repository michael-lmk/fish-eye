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
        console.log("res",res.photographers);
        return res.photographers
    }
}
