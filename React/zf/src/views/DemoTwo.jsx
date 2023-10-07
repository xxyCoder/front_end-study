import React from 'react'

class DemoTwo extends React.PureComponent {
    state = {
        arr: [10, 20, 30]
    }
    render() {
        let { arr } = this.state;
        return <div>
            {arr.map((item, index) => {
                return <span key={index} style={{ display: "inline-block", width: 100, height: 100, backgroundColor: "pink", margin: 10 }}>{item}</span>
            })}
            <br />
            <button onClick={() => {
                arr.push(40);   // 地址没有发生改变
                this.setState({ arr }); // 不仅仅有更新数据的功能，也有重新渲染视图的功能，如果组件继承了Component则可以更新视图
            }} >新增</button>
        </div>
    }
}

export default DemoTwo