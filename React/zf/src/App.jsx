import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import RouterOne from './views/RouterOne';
import RouterTwo from './views/RouterTwo';
import RouterThree from './views/RouterThree';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = function () {
    /**
     * 将内容用哈希路由包裹，开启HASH路由
     * Link实现路由切换
     * 路由每次切换都会对Route进行匹配切换对应组件
     * Switch 确保路由中只有一个匹配，匹配到就不会继续往下匹配
     * Redirct 实现重定向 from从什么地址来 to要重定向的地址
     */
    return <HashRouter>
        <div>
            <Link to="/one">One</Link><br />
            <Link to="/two">Two</Link><br />
            <Link to="/three">Three</Link><br/>
            <Link to="/four">Four</Link>
        </div>
        <Switch>
            <Route path="/one" component={RouterOne} />
            <Route exact path="/two" component={RouterTwo} />
            <Route exact path="/three" component={RouterThree} />
            <Route exact path="/four" render={() => <div>Four</div>} />
            <Redirect to="/one" />
        </Switch>
    </HashRouter>
}

export default App;