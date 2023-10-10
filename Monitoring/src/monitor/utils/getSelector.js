function getSelectors(path) {
    return path
        .reverse()
        .filter(element => element !== document && element !== window)
        .map(elem => {
            if (elem.id) {
                return `${elem.tagName.toLowerCase()}#${elem.id}`;
            } else if (elem.className && typeof elem.className === 'string') {
                return `${elem.tagName.toLowerCase()}.${elem.className}`;
            } else {
                return elem.nodeName.toLowerCase();
            }
        })
        .join(' ');
}

export default function (path) {
    console.log(path)
    if (Array.isArray(path)) {
        return getSelectors(path);
    }
}