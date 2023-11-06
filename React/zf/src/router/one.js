
const routes = [{
    redirect: true,
    exact: true,
    from: "/one",
    to: "/one/a"
}, {
    path: "/one/a",
    exact: true,
    render: () => <div>One-A</div>
}, {
    path: "/one/b",
    exact: true,
    render: () => <div>One-b</div>
}];

export default routes;