const baseUrl = 'https://api.punkapi.com/v2/beers?page=';
const beersDiv = document.querySelector('.beers-div');
const filterABV = document.querySelectorAll('.filter-abv');
const filterIBU = document.querySelectorAll('.filter-ibu');
const pageNumberTxt = document.getElementById('page_number');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let optionsABV = '';
let optionsIBU = '';
let page = 1;
let html = '';

filterABV.forEach(filter => { 
    filter.addEventListener("click", e => {
        if(filter.id === "abv-all") {
            optionsABV = "";
        } else if(filter.id === "abv-weak") {
            optionsABV = "abv_lt=4.6";
        } else if(filter.id === "abv-medium") {
            optionsABV = "abv_gt=4.5&abv_lt=7.6";
        } else if(filter.id === "abv-strong") {
            optionsABV = "abv_gt=7.5"; 
        }
        page = 1;
        getBeers();
    });
});

filterIBU.forEach(filter => { 
    filter.addEventListener("click", e => {
        if(filter.id === "ibu-all") {
            optionsIBU = "";
        } else if(filter.id === "ibu-weak") {
            optionsIBU = "&ibu_lt=35";
        } else if(filter.id === "ibu-medium") {
            optionsIBU = "&ibu_gt=34&ibu_lt=75";
        } else if(filter.id === "ibu-strong") {
            optionsIBU = "&ibu_gt=74";
        }
        page = 1;
        getBeers();
    }); 
});

async function getBeers() {
    let url = baseUrl + page + "&" + optionsABV + optionsIBU;
    let response = await fetch(url);
    let beers = await response.json();

    pageNumberTxt.innerText = page;

    if(page === 1) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    };
    if(beers.length < 25) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
 
    html = '';
    const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';
    beers.forEach(beer => {
        const {name, abv, ibu, image_url, tagline, description, food_pairing} = beer;
        html +=`
        <div class="beer-wrapper card">
            <div class="beer">
                <h3 class="beer_name">${name}</h3>
                <img class="beer_img" src="${image_url ? image_url : genericBottle}">
                <div class="beer_details">
                    <h3>abv: ${abv}</h3>
                    <h3>ibu: ${ibu}</h3>
                </div>
            </div>
            <div class="beer-content">
                <div class="beer-name">${name}</div>
                <div class="beer-tagline">${tagline}</div>
                <div class="beer-description">${description}</div>
                <div class="beer-food_pairing">
                    Pair with: ${food_pairing.join(', ')}
                </div>
            </div>
        </div>
        `
    });
    beersDiv.innerHTML = html;
}

nextBtn.addEventListener("click", ()=> {
    page++;
    getBeers();
});
prevBtn.addEventListener("click", () => {
    page--;
    getBeers();
});

getBeers();