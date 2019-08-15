console.log("All good");
var jsContainer = document.getElementById("mountNode");

class Counter extends React.Component {

  state = {
    count: 0,
    currentTimeStamp : new Date()
  }

  
  handleClick = () => {
    this.setState(prevState => ({count: prevState.count + 1}));
    console.log(`Clicked ${this.state.count}`);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({currentTimeStamp : new Date()});
    }, 1000)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click me</button>
        <p>Clicked: {this.state.count} times</p>
        <p>Current Time: {this.state.currentTimeStamp.toLocaleString()}</p>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, jsContainer);
