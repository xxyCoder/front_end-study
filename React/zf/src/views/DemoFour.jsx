import React from 'react'

class DemoFour extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0
    };

    handle = () => {
        const { x, y, z } = this.state;
        this.setState({
            x: x + 1
        }, () => {
            console.log("x update end")
        });
        this.setState({
            y: y + 1
        }, () => {
            console.log("y update end")
        });
        this.setState({
            z: z + 1
        }, () => {
            console.log("z update end")
        });
        Promise.resolve().then(() => {
            this.setState({
                x: x + 2
            }, () => {
                console.log("x update end 2.0")
            })
        })
        Promise.resolve().then(() => {
            this.setState({
                x: x + 2.1
            }, () => {
                console.log("x update end 2.1")
            })
        })
        setTimeout(() => {
            this.setState({
                x: x + 3
            }, () => {
                console.log("x update end 3.0")
            })
        })
        setTimeout(() => {
            this.setState({
                x: x + 3
            }, () => {
                console.log("x update end 3.1")
            })
        }, 1000)
        setTimeout(() => {
            this.setState({
                x: x + 3
            }, () => {
                console.log("x update end 3.2")
            })
        }, 2000)
        setTimeout(() => {
            this.setState({
                x: x + 3
            }, () => {
                console.log("x update end 3.3")
            })
        }, 2001)
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    render() {
        console.log("render")
        let { x, y, z } = this.state
        return <div>
            {x} - {y} - {z}
            <br />
            <button onClick={this.handle}>按钮</button>
        </div>
    }
}



export default DemoFour