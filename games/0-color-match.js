console.log("All good");
var jsContainer = document.getElementById("mountNode");
const colors = [
  'black', 'blue', 'green', 'yellow', 'red'
]
console.log(_.sample(colors));
class Game extends React.Component {
  state = {
    meaningWord: _.sample(colors), 
    inkWord: _.sample(colors), 
    inkColor: _.sample(colors),
    gameStatus: 'playing'
  };
  
  handleClick = (yesClick) => {
    console.log(yesClick);
    this.setState((prevState) => {
      if (prevState.gameStatus !== 'playing') { 
        return null; // Do nothing.
      }
      const meaningInkMatch = this.state.meaningWord === this.state.inkColor;
      const correct = (meaningInkMatch ^ yesClick) === 0;
      return {gameStatus: correct ? 'correct' : 'wrong'};
    }, this.resetGameAfterDelay);
  };

  resetGameAfterDelay = () => { setTimeout(() => {
    this.setState({
      meaningWord: _.sample(colors),
      inkWord: _.sample(colors),
      inkColor: _.sample(colors),
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
          <div className="meaning">{this.state.meaningWord}</div>
          <div className="ink" style={{color: this.state.inkColor}}>{this.state.inkWord}</div>
          <div className="buttons">
            <button onClick= {() => {this.handleClick(true)}}>YES</button>
            <button onClick= {() => {this.handleClick(false)}}>NO</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, jsContainer);
