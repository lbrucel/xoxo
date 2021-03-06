import { Map } from 'immutable'
let board = Map()

function streak(board, c1, c2, c3) {
  if (board.getIn(c1) && board.getIn(c2) && board.getIn(c3)) {
    if (
      board.getIn(c1) === board.getIn(c2) &&
      board.getIn(c2) === board.getIn(c3)
    ) {
      // console.log("streak log", board.getIn(c1));
      return board.getIn(c1)
    }
  }
  return undefined
}

function winner(board) {
  const row1 = streak(board, [0, 0], [0, 1], [0, 2])
  if (row1) {
    console.log('winner!')
    return row1
  }
  const row2 = streak(board, [1, 0], [1, 1], [1, 2])
  if (row2) {
    return row2
  }
  const row3 = streak(board, [2, 0], [2, 1], [2, 2])
  if (row3) {
    return row3
  }
  const col1 = streak(board, [0, 0], [1, 0], [2, 0])
  if (col1) {
    return col1
  }
  const col2 = streak(board, [0, 1], [1, 1], [2, 1])
  if (col2) {
    return col2
  }
  const col3 = streak(board, [0, 2], [1, 2], [2, 2])
  if (col3) {
    return col3
  }
  const diag1 = streak(board, [0, 0], [1, 1], [2, 2])
  if (diag1) {
    return diag1
  }
  const diag2 = streak(board, [0, 2], [1, 1], [2, 0])
  if (diag2) {
    return diag2
  }

  //loop through board to check for any open spaces
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      if (!board.hasIn([r, c])) {
        return null
      }
    }
  }
  return 'draw'
}

function move(turn, position) {
  // console.log("in move function", position);
  console.log(winner(board))
  return { type: MOVE, coord: position, player: turn }
}

const MOVE = 'MOVE'

function turnReducer(turn = 'X', action) {
  console.log("in turnReducer")
  if (action.type === MOVE) return turn === 'X' ? 'O' : 'X'
  return turn
}

function boardReducer(board = Map(), action) {
  console.log("in boardReducer", action)
  if (action.type === MOVE) return board.setIn(action.coord, action.player)
  return board
}

function gameReducer(state = {}, action) {
  console.log("in gameReducer")
  const nextBoard = boardReducer(state.board, action)
  const winnerState = winner(nextBoard)
  return {
    board: nextBoard,
    turn: turnReducer(state.turn, action),
    winner: winnerState,
  }
}

export { move, streak, gameReducer }
