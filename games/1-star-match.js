console.log("All good");
var jsContainer = document.getElementById("mountNode");

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
              <button key={number} className="number">
                    {number}
                  </button>
              )}
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Game />, jsContainer);
