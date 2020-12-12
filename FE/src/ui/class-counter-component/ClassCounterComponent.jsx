import { Component, useState, useEffect } from "react";
import "./ClassCounterComponent.scss";

const classes = ["c1", "c2", "c3"];

const defaultState = {
  counter: 0,
  altraProp: "string",
  spanClass: classes[0],
};

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const getNextClass = previousClass => {
  const previousIndex = classes.indexOf(previousClass);
  return classes[(previousIndex + 1) % classes.length];
};

export class ClassCounterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onIncrease = this.onIncrease.bind(this);
  }

  componentDidMount() {
    this.setState({
      counter: getRandomInt(10),
      spanClass: classes[this.props.startingColourClassName || 0],
    });
  }

  componentDidUpdate() {
    console.log("this.state: ", this.state);
    console.log("this.props: ", this.props);
  }

  onIncrease() {
    const { counter, spanClass } = this.state;
    this.setState({ counter: counter + 1, spanClass: getNextClass(spanClass) });
  }

  render() {
    const { counter, spanClass } = this.state;
    return (
      <div>
        <span className={spanClass}>{counter}</span>
        <button onClick={this.onIncrease}>Incrementa</button>
      </div>
    );
  }
}

export const FunctionCounterComponent = props => {
  const [counter, setCounter] = useState(0);
  const [spanClass, setSpanClass] = useState(classes[0]);

  useEffect(() => {
    setCounter(getRandomInt(10));
    setSpanClass(classes[props.startingColourClassName || 0]);
  }, []);

  useEffect(() => {
    console.log("this.state: ", { counter, spanClass });
    console.log("this.props: ", props);
  });

  const onIncrease = () => {
    setCounter(counter + 1);
    setSpanClass(getNextClass(spanClass));
  };

  return (
    <div>
      <span className={spanClass}>{counter}</span>
      <button onClick={onIncrease}>Incrementa</button>
    </div>
  );
};
