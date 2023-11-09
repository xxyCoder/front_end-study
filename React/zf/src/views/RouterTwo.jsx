const RouterTwo = function (props) {
    const { history } = props;

    return <div>
        Two
        <button onClick={() => {
            history.push({
                pathname: "/three",
                search: "name=xxyCoder"
            })
        }}>Three1</button>
        <button onClick={() => {
            history.push({
                pathname: "/three/100/xxyCoder",
            })
        }}>Three2</button>
        <button onClick={() => {    // 隐式传参
            history.push({
                pathname: "/three",
                state: {
                    id: 100,
                    name: "xxyCoder"
                }
            })
        }}>Three3</button>
    </div>
}

export default RouterTwo;