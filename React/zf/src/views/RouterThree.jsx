import { useParams, useRouteMatch } from "react-router-dom";

const RouterThree = function (props) {
    const match = useRouteMatch();
    const params = useParams();
    console.log("params1:", match.params);
    console.log("params2:", params);
    console.log("params3:", props.match.params);

    const { location } = props;
    console.log("params4:", location.state);
    return <div>
        Three
        {location.search}
    </div>
}

export default RouterThree;