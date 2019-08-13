console.log("All good");
var jsContainer = document.getElementById("mountNode");

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  
  handleClick = () => {
    this.setState(state => ({count: state.count + 1}));
    console.log(`Clicked ${this.state.count}`);
  }
  render() {
    return (
      <button onClick={this.handleClick}>{this.state.count.toString()}</button>
    )
  }
}
ReactDOM.render(<Counter />, jsContainer);
