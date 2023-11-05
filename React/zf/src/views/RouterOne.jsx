import { Link, Redirect, Route, Switch } from "react-router-dom";

const OneA = function () {
    return <div>One-A</div>
}

const RouterOne = function () {
    return <div>
        One
        <div>
            <Link to="/one/a">One-a</Link>
            <Link to="/one/b">One-b</Link>
        </div>
        <Switch>
            <Redirect exact from="/one" to="/one/a" />
            <Route exact path="/one/a" component={OneA} />
            <Route exact path="/one/b" render={() => <div>One-B</div>} />
        </Switch>
    </div>
}

export default RouterOne;