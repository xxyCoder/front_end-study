import { useState } from 'react'
// 静态组件
const Vote = function (props) {
    const { title } = props;
    // let supNum = 0, oppNum = 0;
    let [state, setState] = useState({
        supNum: 0,
        oppNum: 0
    })

    const handler = (type) => {
        console.log(type)
        // 不会像类组件的setState一样，不支持部分状态更新
        if (type === "sup") {
            setState({ ...state, supNum: state.supNum + 1 });
        } else {
            setState({ ...state, oppNum: state.oppNum + 1 });
        }
    }

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{title}</h2>
            <span>{state.supNum + state.oppNum}人</span>
        </div>
        <div className="main">
            <p>支持人数:{state.supNum}</p>
            <p>反对人数:{state.oppNum}</p>
        </div>
        <div className="footer">
            <button onClick={handler.bind(null, "sup")}>支持</button>
            <button onClick={handler.bind(null, "opp")}>反对</button>
        </div>
    </div>
}

export default Vote