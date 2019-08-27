console.log("All good");
var jsContainer = document.getElementById("mountNode");

const colors = {
  used: 'lightgreen', 
  wrong: 'lightcoral', 
  selected: 'deepskyblue',
};

const randomSum = (arr, maxSum) => {
  const sets = [
      []
    ],
    sums = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0, len = sets.length; j < len; j++) {
      const candidateSet = sets[j].concat(arr[i]);
      const candidateSum = _.sum(candidateSet);
      if (candidateSum <= maxSum) {
        sets.push(candidateSet);
        sums.push(candidateSum);
      }
    }
  }
  return _.sample(sums);
}

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

  numbers = _.range(1, 10);
  stars = _.range(randomSum(this.numbers, 9));

  state = {
    selectedNumbers: [],
    usedNumbers: []
  };

  
  onNumberClick = (number) => {
    
    this.setState((prevState) => {
      let {
        selectedNumbers,
        usedNumbers,
      } = prevState;

      if (selectedNumbers.indexOf(number) >= 0) {
        // Unselect already selected number
        selectedNumbers = selectedNumbers.filter(sn => sn !== number);
      } else {
        selectedNumbers = [...selectedNumbers, number];
      }

      const selectedSum = _.sum(selectedNumbers);
      this.selectionIsWrong = selectedSum > this.stars.length;

      if(selectedSum === this.stars.length) {
        usedNumbers = [...usedNumbers, ...selectedNumbers];
        selectedNumbers = [];
        this.stars = _.range(
          randomSum(_.difference(this.numbers, usedNumbers), 9)
        );
      }

      return {
        selectedNumbers,
        usedNumbers,
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
            {this.stars.map(starIndex => <div key={starIndex} className="star" />
            )}
          </div>
          <div className="play-numbers">
            {this.numbers.map(number => {

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
