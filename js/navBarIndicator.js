var percent = 0;
window.addEventListener("resize", function () {
    var elem = document.getElementById("menuIndicetor");
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (percent < 2) {
        console.log("da", w);
        elem.style = "";
        elem.style.opacity = 1;
    } else {
        elem.style.left = 0;
        elem.style.opacity = 0;

    }
});

window.addEventListener("scroll", function (event) {
    var elem = document.getElementById("menuIndicetor");
    var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
    percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    if (percent < 2) {
        elem.style = "";
        elem.style.opacity = 1;
    } else {
        elem.style.left = 0;
        elem.style.opacity = 0;
    }

});


