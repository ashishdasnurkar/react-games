console.log("All good");
var jsContainer = document.getElementById("mountNode");
var jsContainer2 = document.getElementById("mountNode2");

function Button (props) {
  return <button type="submit">{props.label}</button>;
}

class Button2 extends React.Component {
  render() {
    return <button> {this.props.label}</button>
  }
}
ReactDOM.render(<Button label="Functional Button" />, jsContainer);
ReactDOM.render(<Button2 label="Classy Button" />, jsContainer2);