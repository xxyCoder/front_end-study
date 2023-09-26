fetch("http://localhost:3000")
    .then(async response => {
        console.log("同步属性:", response.status, response.statusText)
        response.headers.forEach((v, k) => console.log(k, ":", v))
        if (response.status >= 200 && response.status < 300) {  // 判断是否请求成功，或者使用response.ok属性判断
            const reader = response.body.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                console.log(`Receiver ${value.length} bytes`)
            }
            // return response.text(); // 异步操作，取出所有内容，并转换为JSON对象
        } else {
            throw new Error(response.statusText)
        }
    })
    .then(json => {
        console.log(json);
    })
    .catch(err => console.log(err))

// 取消请求
const controller = new AbortController();
setTimeout(() => controller.abort(), 1000)

const respponse = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: "foo=bar&name=xxyCoder",
    mode: "cors",
    keepalive: true,
    signal: controller.signal
})
console.log(respponse.json())
