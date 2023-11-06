import { Link } from "react-router-dom";
import one from '../router/one';
import RouterView from "../router";


const RouterOne = function () {
    return <div>
        One
        <div>
            <Link to="/one/a">One-a</Link>
            <Link to="/one/b">One-b</Link>
        </div>
        <RouterView routes={one} />
    </div>
}

export default RouterOne;