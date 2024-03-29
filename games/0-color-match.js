console.log("All good");
var jsContainer = document.getElementById("mountNode");
const colors = [
  'black', 'blue', 'green', 'yellow', 'red'
]
const randomColors = () => {
  const meaningWord = _.sample(colors); 
  const inkWord = _.sample(colors); 
  const inkColor = Math.random() < 0.4 ? meaningWord : _.sample(colors);
  return {
    meaningWord,
    inkWord,
    inkColor,
    meaningInkMatch: meaningWord === inkColor,
  }; 
};

class Game extends React.Component {
  state = {
    gameStatus: 'playing',
    score: 0
  };

  coreValues = randomColors();

  handleClick = (yesClick) => {
    console.log(yesClick);
    this.setState((prevState) => {
      if (prevState.gameStatus !== 'playing') { 
        return null; // Do nothing.
      }
      const correct = (this.coreValues.meaningInkMatch ^ yesClick) === 0;
      if(correct) {
        return {
          gameStatus: 'correct',
          score: prevState.score + 1
        }
      } else {
        return {
          gameStatus: 'wrong',
          score: prevState.score - 1
        }
      }
    }, this.resetGameAfterDelay);
  };

  resetGameAfterDelay = () => { setTimeout(() => {
    this.coreValues = randomColors();
    this.setState({
      gameStatus: 'playing',
});
}, 500);
};

  render() {
    return (
      <div className="game">
        <div className="help">
          Does the meaning of the top word match the ink
          color of the bottom word?
        </div>
        <div className="body">
          <div className= {
            `game-status status-${this.state.gameStatus}`
          } />
          <div className="meaning">{this.coreValues.meaningWord}</div>
          <div className="ink" style={{color: this.coreValues.inkColor}}>{this.coreValues.inkWord}</div>
          <div className="buttons">
            <button onClick= {() => {this.handleClick(true)}}>YES</button>
            <button onClick= {() => {this.handleClick(false)}}>NO</button>
          </div>
        </div>
        <div className="help">
          Your current score is : {this.state.score}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, jsContainer);
