import React, { useState, useMemo, useCallback } from "react";

let prev1, prev2;

const FuncFifth = function () {
    const [x, setX] = useState(0);
    const [y, setY] = useState(10);
    const [z, setZ] = useState(100);

    const sum = useMemo(() => {
        console.log("useMemo")
        return x + y;
    }, [x, y]);

    const handler1 = () => { };
    const handler2 = useCallback(() => { }, []);
    if (!prev1) {
        prev1 = handler1;
        prev2 = handler2;
    } else {
        console.log(prev1 === handler1, prev2 === handler2);
    }

    return <div>
        {x} + {y} == {sum}
        <br />
        <button onClick={() => setX(x + 1)}>++x</button> &nbsp;
        <button onClick={() => setY(y + y)}>++y</button>
        <hr />
        {z}
        <br />
        <button onClick={() => setZ(z * 2)}>++z</button>
        <hr />
        <Child handler2={handler2}></Child>
    </div>
}

const Child = React.memo(function (props) {
    console.log("Child");
    return <div>
        <button onClick={props.handler2}>none</button>
    </div >

})

export default FuncFifth