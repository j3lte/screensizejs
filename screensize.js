/*jslint browser: true, unparam: true */

/**
 * IE Compatibility fix bindEvent
 */
function bindEvent(el, eventName, eventHandler) {
    'use strict';
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + eventName, eventHandler);
    }
}

/**
 * IE Compatibility fix getComputedStyle
 */
if (!window.getComputedStyle) {
    window.getComputedStyle = function (el, pseudo) {
        'use strict';
        this.el = el;
        this.getPropertyValue = function (prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop === 'float') {
                prop = 'styleFloat';
            }
            if (re.test(prop)) {
                prop = prop.replace(re, function (a, b, c) {
                    return c.toUpperCase();
                });
            }
            if (el.currentStyle[prop]) {
                return el.currentStyle[prop];
            }
            return null;
        };
        return this;
    };
}

/**
 * Self executing
 */

(function () {
    'use strict';
    var fontSize,
        timeOut = null;

    /**
     * Add the screensize element to body and calculates font-size
     * @return {void}
     */
    function addEl() {
        var body = document.getElementsByTagName('body')[0],
            el = document.createElement("div");
        fontSize = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0], null).getPropertyValue("font-size") || window.getComputedStyle(document.body, null).getPropertyValue("font-size"), 10);

        el.id = 'screensize';
        el.setAttribute("style", "background: rgba(0, 0, 0, 0.2); color: #000; font-weight: 700; padding: 2px; position: fixed; right: 5px; top: 5px; z-index: 1000;");

        body.appendChild(el);
    }

    /**
     * Show viewport size in upper right corner
     * @return {void}
     */
    function handleResize() {
        var innerWidth = window.innerWidth || document.documentElement.clientWidth,
            innerHeight = window.innerHeight || document.documentElement.clientHeight;
        document.getElementById("screensize").innerHTML = "Fontsize: " + fontSize + "px, <br /> Screensize: " + parseInt(innerWidth / fontSize, 10) + " x " + parseInt(innerHeight / fontSize, 10) + " em";
    }


    /**
     * Start the code and add an event listener to resize. Only fire handleResize 250ms after stop resizing
     * @return {void}
     */
    function init() {
        addEl();
        handleResize();
        bindEvent(window, "resize", function () {
            if (timeOut !== null) {
                clearTimeout(timeOut);
            }
            timeOut = setTimeout(handleResize, 250);
        });
    }

    bindEvent(window, "load", init);

}());