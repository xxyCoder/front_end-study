
const RouterTwo = function (props) {
    const { history } = props;
    return <div>
        Two
        <button onClick={() => {
            history.push({
                pathname: "/three",
                search: "name=xxyCoder"
            })
        }}>Three</button>
    </div>
}

export default RouterTwo;