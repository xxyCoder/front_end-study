import React from 'react'

class DemoFour extends React.Component {
    state = {
        x: 0
    };

    handle = () => {
        for (let i = 0; i < 20; ++i) {
            this.setState({
                x: this.state.x + 1
            })
        }
    }

    handleCallback = () => {
        for (let i = 0; i < 20; ++i) {
            this.setState((prevState) => {
                return {
                    x: prevState.x + 1
                }
            })
        }
    }

    render() {
        console.log("render");
        const { x } = this.state;
        return <div>
            {x}
            <br />
            <button onClick={this.handle}>按钮</button>
            <button onClick={this.handleCallback}>按钮2</button>
        </div>
    }
}



export default DemoFour