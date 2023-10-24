import React from "react";
import PropTypes from 'prop-types'
import ThemeContext from "../ThemeContext";

class DemoSeven extends React.Component {
    state = {
        supNum: 0,
        oppNum: 0,
        x: 1
    };

    componentDidMount() {
        console.log("parent mounted");
    }

    shouldComponentUpdate() {
        console.log("parent should update?");
        return true;
    }

    componentDidUpdate() {
        console.log("parent updated");
    }

    change = (type, payload) => {
        if (type === "sup") {
            this.setState({ supNum: this.state.supNum + payload });
        } else {
            this.setState({ oppNum: this.state.oppNum + payload });
        }
    }

    handler = (payload) => {
        this.setState({ x: this.state.x + payload });
    }

    render() {
        console.log("parent render");
        return (
            <ThemeContext.Provider value={{ x: this.state.x, handler: this.handler }}>
                {this.state.oppNum} --- {this.state.supNum}
                <Child change={this.change} />
            </ThemeContext.Provider>
        )
    }
}

class Child extends React.Component {
    static contextType = ThemeContext;
    static propTypes = {
        change: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProp, nextState) {
        console.log("child should udated");
        return nextProp.change !== this.props.change
    }

    componentDidMount() {
        console.log("child mounted", this.context);
    }

    render() {
        console.log("child render");
        const { change } = this.props;
        return <div>
            <button onClick={() => change("opp", 1)}>opp</button>
            <button onClick={() => change("sup", 1)}>opp</button>
            <Grandson />
        </div>
    }
}

class Grandson extends React.Component {
    render() {
        console.log("Grandson render");
        return <ThemeContext.Consumer>
            {context => {
                const { x, handler } = context;
                return <div>
                    <button onClick={() => handler(x)}>{x}</button>
                </div>
            }}
        </ThemeContext.Consumer>
    }
}

export default DemoSeven;