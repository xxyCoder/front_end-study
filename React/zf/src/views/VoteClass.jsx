// 类组件
import React from "react";
import PropTypes from 'prop-types'

class VoteClass extends React.Component {
    // 属性规则校验
    static defaultProps = {
        num: 0
    }
    static propTypes = {
        title: PropTypes.string.isRequired
    }
    // 初始化状态
    state = {
        supNum: 0,
        oppNum: 0
    }
    // constructor(props) {
    //     super(props);
    // }

    render() {
        console.log("render")
        const { supNum, oppNum } = this.state;
        const { title } = this.props;

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
                <button onClick={() => this.setState({ supNum: supNum + 1 })}>支持</button>
                <button onClick={() => { ++this.state.oppNum; this.forceUpdate() }}>反对</button>
            </div>
        </div>
    }
    componentWillMount() {
        console.log("componentWillMount")
    }
    componentDidMount() {
        console.log("componentDidMount")
    }
    shouldComponentUpdate(nextProps, nextState) {   // 此时状态还没有发生改变
        console.log("shouldComponentUpdate")
        console.log(this.props, " VS ", nextProps);
        console.log(this.state, "  VS ", nextState);
        // return true  允许更新，进行下一步
        // return false 不允许更新
        return true
    }
    componentWillUpdate() { // 此时状态还没有发生改变
        console.log("componentWillUpdate", this.state, this.props)
    }
    componentDidUpdate() {
        console.log("componentDidUpdate")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }
}

export default VoteClass