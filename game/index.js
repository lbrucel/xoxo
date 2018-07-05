import { Map } from 'immutable'
let board = Map()

const initialState = {
  board,
  turn: 'X',
}

function move(turn, position) {
  console.log('in move function', position)
  return { type: 'move', position: position }
}

export default function gameReducer(state = initialState, action) {
  console.log('hi from our reducer')
  let nextPlayer = 'X'
  switch (action.type) {
    case 'move':
      board = board.setIn(action.position, state.turn)
      if (state.turn === 'X') {
        nextPlayer = 'O'
      }
      return { board, turn: nextPlayer }
    default:
      return state
  }
}

export { move }
