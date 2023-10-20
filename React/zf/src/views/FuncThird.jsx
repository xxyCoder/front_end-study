import { useState, useEffect } from "react";
import { flushSync } from 'react-dom'

const FuncThird = function (props) {
    console.log("exec");
    let [x, setX] = useState(0);
    let [num, setNum] = useState(() => {
        console.log("func");
        const { y, z } = props;
        let total = 0
        for (let i = y; i <= z; ++i) {
            total += String(Math.random()).substring(2);
        }
        return total;
    });

    const handle = () => {
        for (let i = 0; i < 10; ++i) {
            flushSync(() => {
                setX(x + 1);
            });
        }
    }

    const same = () => {
        setX(x);
    }

    const handle2 = () => {
        for (let i = 0; i < 10; ++i) {
            setX(prev => prev + 1);   // 返回值是修改值的状态
        }
    }

    const set = () => {
        setNum(1000);
    }

    useEffect(() => {
        console.log(document.querySelector(".box"));
        console.log("拿到最新的x:", x);
        return () => {
            console.log("函数释放，更新执行下一次函数", x)
        }
    })

    useEffect(() => {
        console.log("[]");
        return () => {
            console.log("没内容")
        }
    }, []);

    useEffect(() => {
        console.log("x:", x);
        return () => {
            console.log("x的上一次状态:", x);
        }
    }, [x]);

    return <div className="box">
        <span>{x}</span><br />
        <button onClick={handle}>新增</button>
        <button onClick={same}>不变</button>
        <button onClick={handle2}>新增2</button>
        <hr />
        <span>{num}</span>
        <button onClick={set}>改变</button>
    </div>
}

export default FuncThird