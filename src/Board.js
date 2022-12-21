import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nColumns: 5,
  }
  constructor(props) {
    super(props);
    this.state = {
        board: this.createBoard(),
        hasWon: false,
    }
    // TODO: set initial state
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this)
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    board = [...Array(this.props.nRows)].map(_=>Array())
    for (var i = 0; i < this.props.nRows; i++) {
        for (var j = 0; j < this.props.nColumns; j++) {
            let rand = Math.floor(Math.random() * 2);
            if (rand === 0) rand = false;
            if (rand === 1) rand = true;
            board[i] = [...board[i], rand]
        }
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {nColumns, nRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nColumns && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip this cell and the cells around it
    // y --- row, x ---- column
    flipCell(y, x);
    flipCell(y+1, x);
    flipCell(y, x+1);
    flipCell(y-1, x);
    flipCell(y, x-1);

    // win when every cell is turned off
    function determineWinner() {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j] === true) return false
            }
        }
        return true
    }

    // TODO: determine is the game has been won
    var isWinner = determineWinner()

    this.setState({
        board,
        hasWon: isWinner 
    });
  }


  /** Render game board or winning message. */

  render() {
    var rowCount = -1, columnCount = 0;
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    return (
        <div>
        { this.state.hasWon ? <p className="winnerText">You Win!</p> :
        <div>
        <p className ="heading">The Lights Out Game</p>
        <table className="Board">
            <tbody>
                {this.state.board.map((row) => (
                    columnCount = -1,
                    rowCount++,
                    <tr key={Math.random()}>{row.map((column) =>( 
                        columnCount++, <Cell key={`${rowCount}-${columnCount}`} 
                        coord={`${rowCount}-${columnCount}`} 
                        isLit={column} flipCellsAroundMe={this.flipCellsAround}/>))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        }
        </div>
    )
  }
}


export default Board;
