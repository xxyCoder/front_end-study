import { useState } from 'react';

const DemoFirst = function () {
    let [count, setCount] = useState(0);
    const handler = () => {
        setCount(count + 1)
        // 每一次调用setCount都会重新执行DemoFirst方法，产生新的私有上下文
        setTimeout(() => console.log(count), 3000);
    };

    return <div>
        <button onClick={handler}>{count}</button>
    </div>
}

export default DemoFirst;