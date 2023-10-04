import PropTypes from 'prop-types'
import React from 'react';

const DiaLog = function (props) {
    const { title, content, children } = props;

    const buttonSlot = [];
    React.Children.forEach(children, (c) => {
        buttonSlot.push(c);
    })
    return <div className="dialog-box" style={{ border: "1px solid black", width: "300px" }}>
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>{title}</h1>
            <span>X</span>
        </div>
        <div className="body">
            {content}
        </div>
        <div className="footer" style={{ marginTop: "10px"}}>{buttonSlot}</div>
    </div>
}

DiaLog.defaultProps = {
    content: "温馨提示"
}
DiaLog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired
}

export default DiaLog;