import { HashRouter, Route, Link } from 'react-router-dom';
import RouterOne from './views/RouterOne';
import RouterTwo from './views/RouterTwo';
import RouterThree from './views/RouterThree';

const App = function () {
    /**
     * 将内容用哈希路由包裹，开启HASH路由
     * Link实现路由切换
     * 路由每次切换都会对Route进行匹配切换对应组件
     */
    return <HashRouter>
        <div>
            <Link to="/">One</Link><br />
            <Link to="/two">Two</Link><br />
            <Link to="/three">Three</Link>
        </div>
        <div>
            <Route path="/" component={RouterOne} />
            <Route path="/two" component={RouterTwo} />
            <Route path="/three" component={RouterThree} />
        </div>
    </HashRouter>
}

export default App;