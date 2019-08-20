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
    gameStatus: 'wrong'
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
            <button>YES</button>
            <button>NO</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, jsContainer);
