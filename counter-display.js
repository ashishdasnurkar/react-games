console.log("All good");
var jsContainer = document.getElementById("mountNode");

class Button extends React.Component {
  render(props) {
    return (
      <button onClick={this.props.onClick}> {this.props.label}</button>
    );
  }
}

const CounterDisplay =  ({counter}) => (<div>
      {counter}
  </div>
  );


class CounterManager extends React.Component {

  state = {
    count: 0,
  }

  
  handleClick = () => {
    this.setState(prevState => ({count: prevState.count + 1}));
    console.log(`Clicked ${this.state.count}`);
  }

  render() {
    return (
      <>
        <Button label="Click Me" onClick={this.handleClick} />
        <CounterDisplay counter={this.state.count} />
      </>
    )
  }
}
ReactDOM.render(<CounterManager />, jsContainer);
