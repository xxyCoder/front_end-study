import { useState } from 'react';
import PropTypes from 'prop-types'
import ThemeContext from '../ThemeContext'
import { useContext } from 'react';

const FuncSeventh = function () {
    const [x, setX] = useState(10);

    const handler = (payload) => {
        setX(x + payload);
    }
    return <ThemeContext.Provider value={{ handler }}>
        <p>{x}</p>
        <Child /> &nbsp;
        <Grandson />
    </ThemeContext.Provider>
};

const Child = function () {
    const { handler } = useContext(ThemeContext);
    return <button onClick={() => handler(3)}>+3</button>
}
// Child.contextType = ThemeContext;    不可行
Child.protoTypes = {
    handler: PropTypes.func.isRequired
}

const Grandson = function () {
    return <ThemeContext.Consumer>
        {context => {
            const { handler } = context;
            return <button onClick={() => handler(2)}>+2</button>
        }}
    </ThemeContext.Consumer>
}

Grandson.protoTypes = {
    handler: PropTypes.func.isRequired
}
export default FuncSeventh;