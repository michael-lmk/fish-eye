
async function get_data_photographers() {
    const response = await fetch('../json/data.json');
    const datas = await response.json();
    console.log(datas.photographers);
    return datas.photographers;
    
}

async function build_card () {
    const datas = await get_data_photographers();

    for (let index_1 = 0; index_1 < datas.length; index_1++) {
        const data = datas[index_1];

        let html = `
            <article data-id="${data.id}">
                <a class="link" href="./profile.html?i=${data.id}">
                    <div class="container_img">
                        <img src="./img/Photographers ID Photos/${data.portrait}" alt="">
                    </div>
                    <h2>${data.name}</h2>
                </a>
                <h4>${data.city}, ${data.country}</h4>
                <p>${data.tagline}</p>
                <p>${data.price}€/jour</p>
                <div class="tags">`;

            for (let index = 0; index < data.tags.length; index++) {
                const element = data.tags[index];
                html+= `<a href="">#${element}</a>`;
            }

            html +=`</div>
            </article>
      `;
      
        document.getElementById("main").innerHTML += html;
      
    }
    
}




