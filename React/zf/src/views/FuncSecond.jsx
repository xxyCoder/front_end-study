import { useState } from "react";
import { flushSync } from 'react-dom'

const FuncSecond = function () {
    console.log("exec");
    let [x, setX] = useState(0),
        [y, setY] = useState(0),
        [z, setZ] = useState(0);

    const handle = () => {
        setX(x + 1);
        setTimeout(() => {
            setY(y + 1);
        }, 1000);
        setZ(z + 1);
        flushSync(() => {
            setX(x + 2);
        })
    }

    return <div>
        <span>{x}</span><br />
        <span>{y}</span><br />
        <span>{z}</span><br />
        <button onClick={handle}>新增</button>
    </div>
}

export default FuncSecond