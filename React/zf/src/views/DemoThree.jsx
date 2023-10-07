import React from "react";
import DemoTwo from "./DemoTwo";

const FuncComponent = React.forwardRef(function funcComponent(props, ref) {
    console.log("funcComponent:", ref);
    return <div>
        子组件
        <p ref={ref} >123456</p>
    </div>
})

class DemoThree extends React.Component {
    h23 = React.createRef()

    render() {
        return <>
            {/* 字符串形式 */}
            <h2 className="title" ref="titleBox">温馨提示</h2>
            {/* 函数形式 */}
            <h2 className="title" ref={dom => this.h22 = dom}>紧急提示</h2>
            {/* ref对象形式 */}
            <h2 className="title" ref={this.h23}>友情提示</h2>
            {/* 类组件 */}
            <DemoTwo ref={dt => this.dt = dt} />
            {/* 函数组件 */}
            <FuncComponent ref={f => this.f = f} />
        </>
    }
    componentDidMount() {
        console.log(this.refs.titleBox)
        console.log(this.h22)
        console.log(this.h23.current)
        console.log(this.dt)
        console.log(this.f)
    }
}

export default DemoThree