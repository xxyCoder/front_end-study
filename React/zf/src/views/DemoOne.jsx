import PropTypes from 'prop-types'
import React from 'react'

const DemoOne = function (props) {
    console.log("props:", props)
    console.log("props 冻结:", Object.isFrozen(props))
    console.log("props 密封:", Object.isSealed(props))
    console.log("props 可扩展:", Object.isExtensible(props))

    let { style, className, title, children, x } = props
    ++x;   // 非要修改传递的值,那么可以使用另外变量接收props中的值
    // 获取插槽信息
    let headerSlot = [], footerSlot = [], defaultSlot = [];
    React.Children.forEach(children, (c) => {
        // console.log(c.props.slot)
        if (c.props.slot === 'header') {
            headerSlot.push(c)
        } else if (c.props.slot === 'footer') {
            footerSlot.push(c)
        } else if (c.props.slot === 'default' || !c.props.slot) {
            defaultSlot.push(c)
        }
    });

    return <div className={`"demo-box" ${className}`} style={style}>
        <h1>{title} --- {x}</h1>
        <div className="demo-header">
            {headerSlot}
        </div>
        <div>
            {defaultSlot}
        </div>
        <div className="demo-footer">
            {footerSlot}
        </div>
    </div>
}

// 设置默认值
DemoOne.defaultProps = {
    x: 0
}

// 其他规则
DemoOne.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number,
    slot: PropTypes.string
}

export default DemoOne