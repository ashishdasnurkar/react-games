console.log("All good");
var jsContainer = document.getElementById("mountNode");

const InputForm = 
  <form target="_blank" action="https://www.google.com/search">
    <div>Enter input and click search</div>
    <input name="q" className="input"></input>
    <Button label="Search" />
  </form>
function Button (props) {
  return <button type="submit">{props.label}</button>;
}

ReactDOM.render(InputForm, jsContainer);
