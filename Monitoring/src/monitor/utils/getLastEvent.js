let lastEvent;

['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(et => {
    document.addEventListener(et, (e) => {
        lastEvent = e;
    }, {
        capture: true,
        passive: true
    })
})

export default function() {
    return lastEvent
}