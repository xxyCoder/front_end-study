const notWords = /[^A-Za-z ]/g;

function UpperFirst(str) {
    if (!str || str === " " || str.length === 0) return "";
    str = str.slice(0, 1).toUpperCase() + str.slice(1);
    return str;
}

function camelCase(str = '') {
    str = String(str);
    str = str.replace(notWords, " ");
    // 以空格作为分隔符
    str = str.split(" ").reduce((prev, s, i) => {
        s = s.toLowerCase();
        return prev + (i ? UpperFirst(s) : s);
    }, "")
    return str.trim();
}

console.log(camelCase("zxCC-aX z132-4a"))