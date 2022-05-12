Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
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

function toggleMenu(e) {
    const menu = document.querySelector('#menu-list');
    if (window.getComputedStyle(menu, null).height == '0px') {
        menu.style['max-height'] = "999px";
    } else {
        menu.style['max-height'] = "0px";
    }
    e.classList.toggle("change");
}
const calcWindChill = (temperature, windSpeed) => parseFloat(35.74 + (0.6215*temperature) - (35.75*(windSpeed**0.16)) + (0.4275*temperature*(windSpeed**0.16))).toFixed(2);