let date, _id

function countDown() {
    date -= 1000;
    if (date < 1000) date = 0
    self.postMessage(date);
    if (date === 0) {
        clearInterval(_id)
    }
}

self.addEventListener("message", function (e) {
    date = +e.data;
    _id = this.setInterval(countDown, 1000);
})