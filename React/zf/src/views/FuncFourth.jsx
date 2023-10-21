import { useState, useLayoutEffect, useEffect } from "react";

const FuncFourth = function () {
    console.log("render");
    let [x, setX] = useState(0);

    useEffect(() => {
        console.log("componentDidMount");
    }, [x])

    useLayoutEffect(() => {
        console.log("layout");
    }, [x]);

    const handle = () => {
        setX(x + 1);
    }

    return <div className="box">
        <span>{x}</span><br />
        <button onClick={handle}>新增</button>
    </div>
}

export default FuncFourth