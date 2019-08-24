console.log("All good");
var jsContainer = document.getElementById("mountNode");

class Number extends React.PureComponent {
  clickHandler = () => {
    console.log('You clicked ' , this.props.number);
  }

  render() {
    return (
      <button key={this.props.number} className="number" onClick={this.clickHandler}>
        {this.props.number}
      </button>
    )
  }
}

class Game extends React.Component {

  state = {
    stars: 1 + Math.floor(9 * Math.random()),
  };

  render() {
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum 
          to the number of stars
        </div>
        <div className="body">
          <div className="stars">
            {_.range(this.state.stars).map(starIndex => <div key={starIndex} className="star" />
            )}
          </div>
          <div className="play-numbers">
            {_.range(1, 10).map(number =>
              <Number key={number} number={number} />
              )}
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Game />, jsContainer);
