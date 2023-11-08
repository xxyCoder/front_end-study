
const RouterThree = function (props) {
    const { location } = props;
    return <div>
        Three
        {location.search}
    </div>
}

export default RouterThree;