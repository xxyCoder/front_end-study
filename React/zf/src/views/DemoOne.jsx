import PropTypes from 'prop-types'

const DemoOne = function (props) {
    console.log("props:", props)
    console.log("props 冻结:", Object.isFrozen(props))
    console.log("props 密封:", Object.isSealed(props))
    console.log("props 可扩展:", Object.isExtensible(props))

    let { style, className, title, children, x } = props
    ++ x;   // 非要修改传递的值,那么可以使用另外变量接收props中的值
    return <div className={`"demo-box" ${className}`} style={style}>
        Demo 1 -- {x}
        <h1>{title}</h1>
        {children}
    </div>
}

// 设置默认值
DemoOne.defaultProps = {
    x: 0
}

// 其他规则
DemoOne.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number
}

export default DemoOne