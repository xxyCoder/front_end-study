// 静态组件
const Vote = function (props) {
    const { title } = props;
    let supNum = 0, oppNum = 0;
    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{title}</h2>
            <span>{supNum + oppNum}人</span>
        </div>
        <div className="main">
            <p>支持人数:{supNum}</p>
            <p>反对人数:{oppNum}</p>
        </div>
        <div className="footer">
            <button onClick={() => ++supNum}>支持</button>
            <button onClick={() => ++oppNum}>反对</button>
        </div>
    </div>
}

export default Vote