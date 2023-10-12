import tracker from '../utils/tracker.js';

export function blankScreen() {
    const wrapperElements = ["html", "body", "#container", ".content"];
    let emptyPoints = 0;
    function getSelector(element) {
        if (element.id) {
            return "#" + element.id;
        } else if (element.className) {
            return "." + element.className.split(" ").filter(item => !!item).join('.');
        } else {
            return element.nodeName.toLowerCase();
        }
    }
    function isWrapper(element) {
        const selector = getSelector(element);
        if (wrapperElements.indexOf(selector) !== -1) {
            emptyPoints++;
        }
    }

    for (let i = 1; i < 10; ++i) {
        let xElements = document.elementFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
        let yElements = document.elementFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);

        isWrapper(xElements[0]);
        isWrapper(yElements[0]);
    }
    if (emptyPoints > 0) {
        let centerElements = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        const log = {
            kind: "stability",
            type: "blank",
            emptyPoints,
            screen: window.screen.width + "x" + window.screen.height,
            viewPoint: window.innerWidth + "x" + window.innerHeight,
            selector: getSelector(centerElements[0])
        }
        // tracker.send(log)
    }
}