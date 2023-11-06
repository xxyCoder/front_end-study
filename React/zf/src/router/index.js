import { Switch, Route, Redirect } from 'react-router-dom';
import { Suspense } from 'react';

function RouterView(props) {
    const { routes } = props;
    return <Switch>
        {
            routes.map((route, index) => {
                const { redirect = false, exact = false, from, to, path, component: Component, render } = route;
                const config = { exact };
                if (redirect) {
                    if (from) config.from = from;
                    config.to = to;

                    return <Redirect key={index} {...config} />
                }

                if (Component) config.component = () => <Suspense fallback={() => <>loading...</>}><Component /></Suspense>;
                else config.render = render;
                config.path = path;
                return <Route key={index} {...config} />
            })
        }
    </Switch>
}

export default RouterView;