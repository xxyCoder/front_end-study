const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", function (event) {
    socket.send("Hello WebSocket!");
});

socket.addEventListener("message", function (event) {
    console.log("message from server", event.data);
})

socket.addEventListener("error", function (e) {
    console.log("err:", e);
})