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
            const events = document.querySelector(`.${town.id}-events-list`)
            if (year !== null) {
                year.textContent = town.yearFounded;
            }
            if (pop !== null) {
                pop.textContent = town.currentPopulation;
            }
            if (rain !== null) {
                rain.textContent = town.averageRainfall;
            }
            if (motto !== null) {
                motto.textContent = town.motto;
            }
            if (events !== null) {
                events.innerHTML = "";
                town.events.map((event) => {
                    const li = document.createElement("li");
                    li.appendChild(document.createTextNode(event))
                    events.appendChild(li);
                })
            }

        })
    } else {

    }
}
// Send Request 

request.send();