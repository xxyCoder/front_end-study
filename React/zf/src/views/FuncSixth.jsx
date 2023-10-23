import React, { useEffect, useState } from "react";

const usePartialState = function (initialValue) {
    const [state, setState] = useState(initialValue);
    const setPartial = function (value) {
        setState({
            ...state,
            ...value
        })
    };
    return [state, setPartial];
}

const useDidMount = function (title = "React") {
    useEffect(() => {
        document.title = title;
    }, [title])
}

const FuncSixth = function () {
    const [state, setPartialState] = usePartialState({
        x: 1,
        y: 2,
        z: 3
    });
    useDidMount("FuncSixth");
    const { x, y, z } = state;
    return <div>
        {x} -- {y} -- {z}
        <br />
        <button onClick={() => setPartialState({ x: x + 1 })}>addX</button> &nbsp;
        <button onClick={() => setPartialState({ y: y + 1 })}>addY</button> &nbsp;
        <button onClick={() => setPartialState({ z: z + 1 })}>addZ</button> &nbsp;
    </div>
}

export default FuncSixth