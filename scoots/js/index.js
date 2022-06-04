Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + parseFloat(days));
    return date;
}

function ordinal_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function formatDate(date, type = null) {

    if (type == null) {
        type = 'ordinal'
    }
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (type == 'ordinal') {
        return `${weekdays[date.getDay()]}, ${month[date.getMonth()]} ${ordinal_of(date.getDate())} ${date.getFullYear()}`;
    } else {
        return `${weekdays[date.getDay()]},  ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
    }
}

db.get().then((db) => {
    console.log(db);
    db.rentalTypes.map((rentalType) => {
        // Create new Rental Type
        const rt = document.createElement('div');
        rt.setAttribute('class', 'rental-type');

        //   Rental Type Title
        const rtTitle = document.createElement('h3');
        rtTitle.appendChild(document.createTextNode(rentalType.name));

        //   Rental Type Summary
        const rtSum = document.createElement('p');
        rtSum.appendChild(document.createTextNode(rentalType.summary));

        // Services list

        const sl = document.createElement('ul');
        sl.setAttribute('class', 'services-list');
        db.services.map((service) => {
            const slItem = document.createElement("li");
            slItem.appendChild(document.createTextNode(service));
            sl.appendChild(slItem);
        });

        // Know more button

        const km = document.createElement("a");
        km.setAttribute("class", "button-link");
        km.setAttribute("href", "rentals.html")
        km.appendChild(document.createTextNode("Know more"));
        // Append all to Rental Type
        rt.appendChild(rtTitle);
        rt.appendChild(rtSum);
        rt.appendChild(sl);
        rt.appendChild(km);
        document.querySelector("#rental-types").appendChild(rt);
    })
});
// 20.428858915829228, -86.92506467084782

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=20.428858915829228&lon=-86.92506467084782&units=imperial&appid=c50b2a933706495fab439a581827e04e').then(request => request.json()).then(data => {
    const days = Array.from(document.querySelectorAll(".day"));
    days.map(day => {
        if (typeof day !== "undefined") {
            const date = new Date();

            const temp = day.querySelector(".weather-temp");
            const condition = day.querySelector(".weather-cond");
            const humidity = day.querySelector(".weather-humidity");

            if (day.getAttribute("data-add") == null) {
                day.querySelector(".day-title").textContent = "Today";
                const weather = data.current;
                temp.textContent = `${weather.temp}ºF`;
                condition.textContent = `${weather.weather[0].description}`;
                humidity.textContent = weather.humidity;

            } else {
                day.querySelector(".day-title").textContent = formatDate(date.addDays(day.getAttribute("data-add") ?? 0));
                const weather = data.daily[parseFloat(day.getAttribute("data-add")) - 1];
                temp.textContent = `${weather.temp.day}ºF`;
                condition.textContent = `${weather.weather[0].description}`;
                humidity.textContent = weather.humidity;

            }

        }
    });
})