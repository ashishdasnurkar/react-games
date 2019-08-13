console.log("All good");
var jsContainer = document.getElementById("mountNode");

function Button (props) {
  return <button type="submit">{props.label}</button>;
}

ReactDOM.render(<Button label="Test" />, jsContainer);