namespace Utils {
    export namespace my {
        export const name = "xxyCoder"
    }

    function isString(value: any) {
        return typeof value === 'string'
    }

    export interface MyInstance {
        my: { readonly name: string };
        error: (msg: string) => void;
    }

    isString("Yes")

    export function error(msg: string) {
        console.error(msg)
    }
}

// import 避免多次.调用
import my = Utils.my
console.log(my.name)

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
    const nickname = "xxyCoder"
}
f.version;

class C {
    foo = "Foo"
}

namespace C {
    export const foo = "bar"
}
let c = new C();
C.foo

export { };