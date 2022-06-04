fetch("assets/header.html").then(response => response.text()).then(text => document.querySelector("header").innerHTML = text).then(() => {});
fetch("assets/nav.html").then(response => response.text()).then(text => document.querySelector("nav").innerHTML = text).then(() => {
    document.querySelector(`#${document.querySelector('nav').getAttribute('data-active')}`).classList.add("active");
    const nav = document.querySelector("#nav");
    document.querySelector("#toggle").addEventListener("click", () => {
        if (window.getComputedStyle(nav, null)['max-height'] == '0px') {
            nav.style['max-height'] = "999px";
        } else {
            nav.style['max-height'] = "0px";
        }
    })
});
fetch("assets/footer.html").then(response => response.text()).then(text => document.querySelector("footer").innerHTML = text).then(() => {

});

if (document.querySelector("aside")) {
    document.querySelector("#main-content").style.width = "65vw";
}