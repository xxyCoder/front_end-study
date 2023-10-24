import React from 'react'
import ReactDom from 'react-dom/client'
import DemoSeven from './views/DemoSeven';

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <>
        <DemoSeven />
    </>
)

// root.render(
//     <>
//         <VoteClass title="React"></VoteClass>
//     </>
// )

// root.render(
//     <>
//         <Vote title="React好学" ></Vote>
//     </>
// )

// root.render(
//     <>
//         <DiaLog title="友情提示" content="出门注意防护，带好口罩！">
//             <button>确定</button>
//             <button>取消</button>
//         </DiaLog>
//     </>
// )
// root.render(
//     <>
//         <DemoOne title="标题一" x={2} className="box" style={{ fontSize: "10px" }} data={[10, 20]} >
//             <span slot='header'>子节点</span>
//             <div slot='default'>默认1</div>
//             <div>默认2</div>
//             <div slot='footer'>Hello xxyCoder</div>
//         </DemoOne>
//         <DemoOne title='标题二' />
//     </>
// )