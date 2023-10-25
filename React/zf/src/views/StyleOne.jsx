// import '../styles/one.css'
import styles from '../styles/one.module.css'

console.log(styles);

const App = function () {
    return <div className={styles.container}>
        <Nav />
    </div>
}

const Nav = function () {
    return <div className={styles.box}>
        <h2 className={styles.title}>购物商城</h2>
        <Menu />
    </div>
}

const Menu = function () {
    return <ul className={styles.menu}>
        <li className={styles.item}>首页</li>
        <li className="item">电子产品</li>
        <li className="item">书本</li>
        <li className="item">玩具</li>
    </ul>
}

export default App;