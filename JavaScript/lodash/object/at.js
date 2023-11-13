function get(object, path) {
    if (!object) return null;
    if (path.length === 0) return object;
    let idx = 0, key = "";
    while (idx < path.length && path[idx] !== '[' && path[idx] !== '.' && path[idx] !== ']') {
        key += path[idx], ++idx;
    }
    if (path[idx] === ']') ++idx;   // ]下一个必然是.
    return get(object[key], path.slice(idx + 1));
}


function at(object, paths) {
    const res = [];
    for (let i = 0; i < paths.length; ++i) {
        res.push(get(object, paths[i]));
    }
    return res;
}

var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
console.log(at(object, ['a[0].b.c', 'a[1]']));