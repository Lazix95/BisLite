/*
 * Variables
 */
var SlideDuration = "1s"; // duration of one slide in secnds;
var IntervalBetweenSlides = 5000; // interval in milisecnds    WARNING: IT CANNOT BE LOWER THEN "SlideDuration"!! 
// do not change thouse values;
var a = document.getElementsByClassName("item"); // 
var caruselWidth = 0;
var slidePosition = 1;
var picNumber = 1;
var ready = 1;

/*
 * slider functions 
 */

function AddBubble() {
    var elem = document.getElementById("JS-Bubble");
    var holder = document.getElementById("JS-BubbleHolder");

    var NumberToAdd = a.length - 1;

    for (var i = 0; i < NumberToAdd; i++) {
        var cln = elem.cloneNode(true);
        cln.setAttribute("data-number", i + 2);
        holder.appendChild(cln);
    }
}


/*
 * This function is synchronising slider with bubbles
 */

function SliderBubbleSinh() {
    /*
     *  value if css atribute margin-left; container margin-left
     */

    var position = GetStyleValue("container", "margin-left");

    /*
     *  width of container and item (ther width must be equall!!)
     */
    SinhContainerItemWidth();
    var parsedPosition = parseInt(position);
    if (parsedPosition < 0) {
        parsedPosition *= -1;
    }
    var parsedCaruselWidth = parseInt(caruselWidth);
    Math.round(picNumber);
    slidePosition = picNumber;
    var Bubbles = document.querySelectorAll("#JS-Bubble");
    for (var i = 0; i < Bubbles.length; i++) {
        var BubbleDataNumber = Bubbles[i].getAttribute('data-number');
        if (BubbleDataNumber == picNumber) {
            Bubbles[i].classList.add("active");
        } else {
            Bubbles[i].classList.remove("active");
        }
    }

}

/*
 * This function is synchronising carusel width with width of sliding items (it makes it responsive);
 */

function SinhContainerItemWidth() {
    var holder = document.getElementById("carusel");
    /*
     * get width of container   carusel width
     */

    var width = parseFloat(GetStyleValue("carusel", "width"));
    caruselWidth = width + "px";
    var height = width * 0.44;
    /*
     * use with of container to set width of carusel item
     */
    holder.style.height = height + "px";
    var items = document.querySelectorAll(".item");
    for (var i = 0; i < items.length; i++) {
        items[i].style.width = width + "px";
        items[i].style.height = height + "px";
    }


    var mult = slidePosition - 1;
    if (slidePosition >= 1) {
        var margin = width * mult * (-1) + "px";
        document.getElementById("container").style.marginLeft = margin;
    }

}

function NextSlide() {
    picNumber += 1;
    SliderBubbleSinh();
    var elem = document.getElementById("container");
    var step = GetStyleValue("carusel", "width");
    if (picNumber <= a.length) {
        Slide(step, "Next");
    } else {
        Slide(0, "BackToStart")
    }
}

function Slide(step, where) {
    var marginLeft = GetStyleValue("container", "margin-left");
    marginLeft = parseInt(marginLeft);
    if (where == "Next") {
        var parsedStep = parseInt(step) * (-1);
        var elem = document.getElementById("container");
        var newMarginLeft = marginLeft + parsedStep + "px";
        elem.style.transition = SlideDuration;
        elem.style.marginLeft = newMarginLeft;
        setTimeout(function () {
            SliderBubbleSinh();
            elem.style.transition = "0s";
        }, 1200);
    } else if (where == "BackToStart") {
        var elem = document.getElementById("container");
        elem.style.transition = SlideDuration;
        elem.style.marginLeft = 0;
        picNumber = 1;
        slidePosition = 1;

        setTimeout(function () {
            SliderBubbleSinh();
            elem.style.transition = "0s";
        }, 1200);
    }

}

function SlideToPic(bubble) {
    intervalManager(false);
    var elem = document.getElementById("container");
    var width = parseFloat(GetStyleValue("carusel", "width"));
    var BubbleNumber = bubble.getAttribute('data-number');
    picNumber = BubbleNumber;
    slidePosition = BubbleNumber;
    SliderBubbleSinh();
    var newMarginLeft = width * (BubbleNumber - 1);
    newMarginLeft = "-" + newMarginLeft + "px"
    elem.style.transition = "1s";
    elem.style.marginLeft = newMarginLeft;
    setTimeout(function () {
        elem.style.transition = "0s";
    }, 1200);
    intervalManager(true);
}

function slideNext() {
    if (ready) {
        ready = 0;
        var elem = document.getElementById("portfolioSliderHolder");
        var elemNumber = document.querySelectorAll(".portfolioSliderItem");
        var shownElements = GetStyleValue("secndSlider", "width");
        shownElements = parseInt(shownElements);
        shownElements = shownElements / 260
        console.log("Broj prikazanih elemenata: ", shownElements);
        elemNumber = elemNumber.length - shownElements;
        var marginLeft = GetStyleValue("portfolioSliderHolder", "margin-left");
        marginLeft = parseInt(marginLeft);
        if ((marginLeft * -1) < (elemNumber * 260)) {
            marginLeft -= 260;
            elem.style.transition = "1s";
            elem.style.marginLeft = +marginLeft + "px";
        }

    }
}
function slidePerv() {
    if (ready) {
        ready = 0;
        var elem = document.getElementById("portfolioSliderHolder");
        var marginLeft = GetStyleValue("portfolioSliderHolder", "margin-left");
        marginLeft = parseInt(marginLeft);
        if (marginLeft != 0) {
            marginLeft += 260;
            elem.style.transition = "1s";
            elem.style.marginLeft = +marginLeft + "px";
        }

    }
}


var intervalID;
function intervalManager(flag) {

    if (flag)
        intervalID = setInterval(NextSlide, IntervalBetweenSlides);
    else
        clearInterval(intervalID);
}

function GetStyleValue(elemID, attribute) {
    var element = document.getElementById(elemID);
    var style = window.getComputedStyle(element);
    var value = style.getPropertyValue(attribute);
    return value;
}

AddBubble();
SliderBubbleSinh();
SinhContainerItemWidth();
intervalManager(true);




var eventTimeout;

var eventThrottler = function () {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!eventTimeout) {
        eventTimeout = setTimeout(function () {
            eventTimeout = null;
            SliderBubbleSinh();
        }, 150);
    }
};

var eventThrottlerSlideNext = function () {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!eventTimeout) {
        eventTimeout = setTimeout(function () {
            eventTimeout = null;
            ready = 1;
        }, 1000);
    }
};

// Run the event listener
window.addEventListener('resize', eventThrottler, false);
document.getElementById("navArrowNext").onclick = function () {
    eventThrottlerSlideNext();
    slideNext();
};
document.getElementById("navArrowPrev").onclick = function () {
    eventThrottlerSlideNext();
    slidePerv();
};