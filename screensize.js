(function() {
    
    var fontSize,
        timeOut = null;

    /**
     * Start the code and add an event listener to resize. Only fire handleResize 250ms after stop resizing
     * @return {void}
     */
    function init() {
        addEl();
        handleResize();
        window.addEventListener("resize", function () {
                 if (timeOut !== null)
                        clearTimeout(timeOut);
                timeOut = setTimeout(handleResize, 250);
        });
    }
    
    /**
     * Add the screensize element to body and calculates font-size
     * @return {void}
     */
    function addEl () {
        var _body = document.getElementsByTagName('body') [0],
                el = document.createElement("div");
        fontSize = parseInt(getComputedStyle(document.getElementsByTagName('body')[0],null).fontSize || getComputedStyle(document.body,0).fontSize,10);

        el.id = 'screensize';
        el.setAttribute("style","background: rgba(0, 0, 0, 0.2); color: #000; font-weight: 700; padding: 2px; position: fixed; right: 5px; top: 5px; z-index: 1000;");

        _body.appendChild(el);
    }

    /**
     * Show viewport size in upper right corner
     * @return {void}
     */
    function handleResize() {
      document.getElementById("screensize").innerHTML = "Fontsize: " + fontSize + "px, <br /> Screensize: " + parseInt(window.innerWidth / fontSize, 10) + " x " + parseInt(window.innerHeight / fontSize, 10) + " em";
    }

    window.addEventListener("load", init);

})();