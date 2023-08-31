namespace Utils {
    function isString(value: any) {
        return typeof value === 'string'
    }

    isString("Yes")

    export function error(msg: string) {
        console.error(msg)
    }
}

// Utils.isString("Error")
Utils.error("可以外部使用")

namespace Utils {
    function toString(value: any) {
        return JSON.stringify(value)
    }
    // isString(13)
    error("上面的")
}

function f() {
    return f.version;
}

namespace f {
    export const version = 1.0
}

class C {
    foo = "Foo"
}

namespace C {
    export const foo = "bar"
}
let c = new C();
C.foo