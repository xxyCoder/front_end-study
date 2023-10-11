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

export default function (pathOrTarget) {
    if (Array.isArray(pathOrTarget)) {
        return getSelectors(pathOrTarget);
    } else {
        const path = [];
        while (pathOrTarget) {
            path.push(pathOrTarget);
            pathOrTarget = pathOrTarget.parent;
        }
        return getSelectors(path);
    }
}