import React, { useState, useLayoutEffect, useEffect, useRef, useImperativeHandle } from "react";


let prev1, prev2;
const FuncFourth = function () {
    console.log("render");
    let [x, setX] = useState(0);
    let box1 = useRef(null);
    let box2 = React.createRef();
    let c = useRef(null);

    if (!prev1) {
        prev1 = box1;
        prev2 = box2;
    } else {
        console.log(prev1 === box1);
        console.log(prev2 === box2);
    }

    useEffect(() => {
        console.log("componentDidMount", box1.current, box2.current, c.current);
    })

    useLayoutEffect(() => {
        console.log("layout", box1.current, box2.current);
    });

    const handle = () => {
        setX(x + 1);
    }

    return <div className="box" ref={box1}>
        <span>{x}</span><br />
        <button ref={box2} onClick={handle}>新增</button>
        <Child ref={c}></Child>
    </div>
}

const Child = React.forwardRef(function (props, ref) {
    console.log("ref:", ref);
    let [text, setText] = useState("Hello Child")
    useImperativeHandle(ref, () => {
        // 在此处返回的内容，都可以被父组件的ref对象拿到
        return {
            text,
            setText
        }
    });
    return <div ref={ref} onClick={() => setText(text + "!")}>{text}</div>
})

export default FuncFourth