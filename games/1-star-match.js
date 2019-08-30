console.log("All good");
var jsContainer = document.getElementById("mountNode");

const colors = {
  available: '#eee',
  used: 'lightgreen', 
  wrong: 'lightcoral', 
  selected: 'deepskyblue',
};

const gameTimeout = 10000;

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
    if(this.props.status !== 'used') {
      this.props.onClick(this.props.number);
    }
  };

  style() {
    if (this.props.isUsed) {
      return { backgroundColor: colors.used };
    }

    if (this.props.isWrong) {
      return {
        backgroundColor: colors.wrong,
      };
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

  // componentDidUpdate() {
  //   console.log('Number updated');
  // }

  // componentWillUpdate(nextProps) {
  //   console.log(this.props, nextProps);
  // }
             

  render() {
    return (
      <button
        style={{ backgroundColor: colors[this.props.status]}}
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
  selectionIsWrong = false;

  state = {
    selectedNumbers: [],
    usedNumbers: [],
    isGameOver: false
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
      this.gameIsDone =
        usedNumbers.length === this.numbers.length;

      return {
        selectedNumbers,
        usedNumbers,
      };
  
    });
  }

  renderStars() {
      return this.stars.map(starIndex =>
        <div className = "star"
        key = {
          starIndex
        }
        />);
      }

  renderPlayAgain() {
    if(this.state.isGameOver)
     {
      return ( <div className = "game-done" >
      <div className = "message" > Oh O! GAME OVER </div> </div> );
     } else {
      return ( <div className = "game-done" >
        <div className = "message" > Nice! </div> <button onClick = {
          this.resetGame
        }> Play Again </button> </div> );
       
      }
    }

  resetGame = () => {
    this.stars = _.range(randomSum(this.numbers, 9));
    this.gameIsDone = false;
    this.setState({
      selectedNumbers: [],
      usedNumbers: [],
      isGameOver: false
    });
  };
  numberStatus(number) {
    if (this.state.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
    const isSelected = this.state.selectedNumbers.indexOf(number) >= 0;
    if (isSelected) {
      return this.selectionIsWrong ? 'wrong' : 'selected';
    }
    return 'available';
  }

  stopTheGame = () => {
    this.gameIsDone = true;
    this.setState({
      isGameOver: true
    });
    this.forceUpdate();
  };

  componentDidMount() {
    setTimeout(() => {this.stopTheGame()}, gameTimeout);
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
          {this.gameIsDone
                ? this.renderPlayAgain() : this.renderStars()
          }
          </div>
          <div className="play-numbers">
            {this.numbers.map(number => {

              const isUsed = this.state.usedNumbers.indexOf(number) >= 0;
              const isSelected = this.state.selectedNumbers.indexOf(number) >= 0;

              return (
              <Number key={number} 
                number={number} 
                status={this.numberStatus(number)}
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
