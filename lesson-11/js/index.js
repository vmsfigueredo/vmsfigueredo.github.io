var request = new XMLHttpRequest();

// Open a new Connection and get Data
request.open('GET', 'https://byui-cit230.github.io/weather/data/towndata.json', true);

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(this.response);
        data.towns.map((town) => {
            town.id = town.name.toLowerCase().replace(" ", "");
            console.log(town);
            const year = document.querySelector(`.${town.id}-year`);
            const pop = document.querySelector(`.${town.id}-pop`);
            const rain = document.querySelector(`.${town.id}-rain`);
            const motto = document.querySelector(`.${town.id}-motto`);

            if (year !== null){
                year.textContent = town.yearFounded;
            }
            if (pop !== null){
                pop.textContent = town.currentPopulation;
            }
            if (rain !== null){
                rain.textContent = town.averageRainfall;
            }
            if (motto !== null){
                motto.textContent = town.motto;
            }
        
        })
    } else {

    }
}
// Send Request 

request.send();