console.log("All good");
var jsContainer = document.getElementById("mountNode");

class Button extends React.Component {
  render(props) {
    return (
      <button onClick={() => this.props.onClick(this.props.incrementBy)}> + {this.props.incrementBy}</button>
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

  
  handleClick = (incrementBy) => {
    this.setState(prevState => ({count: prevState.count + incrementBy}));
    console.log(`Clicked ${this.state.count}`);
  }

  render() {
    return (
      <>
        <Button incrementBy={1} onClick={this.handleClick} />
        <Button incrementBy={5} onClick={this.handleClick} />
        <Button incrementBy={10} onClick={this.handleClick} />
        <CounterDisplay counter={this.state.count} />
      </>
    )
  }
}
ReactDOM.render(<CounterManager />, jsContainer);
