import React from 'react'
import ReactDom from 'react-dom/client'
import DemoOne from './views/DemoOne';

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <>
        <DemoOne title="标题一" x={2} className="box" style={{ fontSize: "10px" }} data={[10, 20]} >
            <span>子节点</span>
            <div>Hello xxyCoder</div>
        </DemoOne>
        <DemoOne title='标题二'/>
    </>
)