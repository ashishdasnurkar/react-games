console.log("All good");
var jsContainer = document.getElementById("mountNode");

const colors = {
  used: 'lightgreen', 
  wrong: 'lightcoral', 
  selected: 'deepskyblue',
};

class Number extends React.PureComponent {
  clickHandler = () => {
    console.log('Click on ' + this.props.number);
    if(!this.props.isUsed) {
      this.props.onClick(this.props.number);
    }
  };

  style() {
    if (this.props.isUsed) {
      return { backgroundColor: colors.used };
    }

    if (this.props.isSelected) {
      return {
        backgroundColor: this.props.selectionIsWrong
          ? colors.wrong
          : colors.selected,
      };
    }

    return {};
  }

  render() {
    return (
      <button
        style={this.style()}
        className="number"
        onClick={this.clickHandler}
      >
        {this.props.number}
      </button>
    );
  }
}

class Game extends React.Component {

  
  state = {
    stars: 1 + Math.floor(9 * Math.random()),
    selectedNumbers: [],
    usedNumbers: []
  };

  onNumberClick = (number) => {
    
    this.setState((prevState) => {
      let {
        selectedNumbers,
        usedNumbers,
        stars
      } = prevState;

      selectedNumbers = [...selectedNumbers, number];
      const selectedSum = _.sum(selectedNumbers);

      if(selectedSum === stars) {
        usedNumbers = [...usedNumbers, ...selectedNumbers];
        selectedNumbers = [];
        stars = 1 + Math.floor(9 * Math.random());
      }

      this.selectionIsWrong = selectedSum > this.state.stars;

      return {
        selectedNumbers,
        usedNumbers,
        stars
      };
  
    });
  }

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
            {_.range(1, 10).map(number => {

              const isUsed = this.state.usedNumbers.indexOf(number) >= 0;
              const isSelected = this.state.selectedNumbers.indexOf(number) >= 0;

              return (
              <Number key={number} 
                number={number} 
                isUsed={isUsed}
                isSelected={isSelected}
                selectionIsWrong={this.selectionIsWrong}
                onClick={this.onNumberClick}
              />
              );
            }
            )}
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Game />, jsContainer);
