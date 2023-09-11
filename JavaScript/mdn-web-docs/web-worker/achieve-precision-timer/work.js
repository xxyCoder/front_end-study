onmessage = (e) => {
    console.log(e.data);
    if (e.data === "start") {
        let i = 0;
        let st = Date.now();
        console.log("action", st)
        while (true) {
            let cur = Date.now();
            if (cur - st >= 1000) {
                console.log("cur", cur);
                ++i;
                if (i === 5) {
                    break;
                }
                st = cur;
            }
        }
    }
}