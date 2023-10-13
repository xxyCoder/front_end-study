import React from 'react';

class DemoSix extends React.Component {
    // React对事件对象进行处理
    handle = (ev) => {
        console.log("合成事件对象SyntheticBaseEvent:", ev, "原生事件:", ev.nativeEvent)
    }
    // 基于bind传递参数，bind会将事件对象以最后一个实参传递给函数
    handle2 = (x, ev) => {
        console.log("x:", x, "ev:", ev);
    }

    componentDidMount() {
        document.body.addEventListener("click", () => {
            console.log("body 冒泡");
        }, false);
        document.body.addEventListener("click", () => {
            console.log("body 捕获");
        }, true);

        const root = document.getElementById("root");
        root.addEventListener("click", () => {
            console.log("root 冒泡");
        }, false);
        root.addEventListener("click", () => {
            console.log("root 捕获");
        }, true);

        const outter = document.querySelector(".outter")
        outter.addEventListener("click", () => {
            console.log("outter 原生 冒泡");
        }, false);
        outter.addEventListener("click", () => {
            console.log("outter 原生 捕获");
        }, true);
    }

    render() {
        return <>
            <button onClick={this.handle}>按钮</button>
            <button onClick={this.handle2.bind(null, 10)}>按钮2</button>

            <div style={{ width: 500, height: 500, backgroundColor: "lightgreen" }} className="outter" onClick={(e) => {
                console.log("outter 冒泡");
                e.stopPropagation();    // 阻止原生事件&合成事件
                e.nativeEvent.stopPropagation() // 阻止原生事件
            }} onClickCapture={() => {
                console.log("outter 捕获");
            }}>
                <div style={{ width: 200, height: 200, backgroundColor: "lightblue" }} className="inner" onClick={() => {
                    console.log("inner 冒泡");
                }} onClickCapture={() => {
                    console.log("inner 捕获");
                }}></div>
            </div>
        </>
    }
}

export default DemoSix;