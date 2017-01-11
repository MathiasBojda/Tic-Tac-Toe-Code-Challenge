
  /// CS
  import '../game.css'

  // Contants, like  WINTRIX
  import { _ } from './constants'

  // All the view logics
  import { updateTileView, viewInit, showOverlay, updateOverlay } from './view'

  // Game state
  let gameState = {
    state : [0, 0, 0, 0, 0, 0, 0, 0, 0],
    turn: _.PLAYER
  };


  // App init logic, pretty much empty.
  const init = () =>  {
    onInit();
  }


  // Main Game Logic
  const setState = ( index, player ) => {

    if ( gameState.state[index] == 0) {
      beforeStateChange([index, player]); // callback
      gameState.state[index] = getStateValFromPlayer(player);
      gameState.turn = !gameState.turn;
    }

    // If it's the AI / Computers turn, call the AI logic
    if ( gameState.turn === _.AI ) {
      AI(gameState.state, 0, gameState.turn, true);
    }


    // Check if there is a winner, and call the callback if there is
    if ( isWin(gameState.state, player) ) {
        onWin(player);
    }

    // If the board is full it's a draw, call the callback.
    if ( isFull(gameState.state) ) {
        onDraw();
    }

  }


  // Check if any of the Winner sequences is fullfilled
  // I know the ES2015 forEach and so on i just decided to skip em here.

  const isWin = (state, player) => {

    const value = getStateValFromPlayer(player);
    let winSeq;

    for (let x = 0; x < _.WINTRIX.length; x++) {
        if ( checkWinTrixSeq(x, value, state) )
          return true;
    }

    return false;

  }

  // checks a single sequence
  const checkWinTrixSeq =  (x, value, state) => {

    for (let y = 0; y < _.WINTRIX[x].length; y++) {
        if (state[_.WINTRIX[x][y]] !== value)
            return false;
    }

    return true;
  }


  // Check if the board is full, this will yield in a draw
  const isFull = (state) => {

    for (let x = 0; x < state.length; x++){
        if (state[x] == 0)
            return false;
    }

    return true;

  }


  // AI based loosely on the minmax approach
  const AI = (board, depth, player, turn) => {

    if ( isWin (board, !player) )
        return -10 + depth;

    if ( isFull (board) )
      return 0;

    const stateValue = getStateValFromPlayer(player);
    let max = -Infinity;
    let index = 0;
    let newBoard;
    let moveVal;

    for ( let x = 0; x < board.length ; x++ ) {

      if ( board[x] !== 0)
        continue;

      newBoard = board.slice();
      newBoard[x] = stateValue;

      moveVal = -AI(newBoard, depth+1 , !player, false );

      if ( moveVal > max ) {
        max = moveVal;
        index = x;
      }

    }

    if ( turn )
      setState(index, player);

    return max;

  }


  // Reset logic
  const reset = () => {

    gameState = {
      state : [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: _.PLAYER
    }

    onReset();
  }


  // Get's the bit/value that is stored in the state tree, based on the player type
  const getStateValFromPlayer = (player) => {
      return player === _.PLAYER ? _.PLAYER_BIT : _.AI_BIT;
  };



  /*  Callbacks  */



  // Called before the game state is changed.
  const beforeStateChange = ( args ) => {
    updateTileView(args);
  };

  // Called when the app is init.
  const onInit = () => {
    viewInit(gameState, tileHandler);
  };

  // Called whenever there is a winner
  const onWin = (player) => {
    const text = player === _.PLAYER ? 'PLAYER WINS' : 'COMPUTER WINS';
    updateOverlay(text, resetHandler);
    showOverlay();
  };

  // Called whenever there is a draw
  const onDraw = () => {
    const text = "It's a draw!";
    updateOverlay(text, resetHandler);
    showOverlay();
  };

  // Called whenever the user resets the game
  const onReset = () => {};





  /*  Handlers */

  // Tile Handler, which is fired when clicked
  const tileHandler = (value, index) => {
    if ( gameState.turn === _.PLAYER ) {
      setState(index, gameState.turn);
    }
  }

  // Reset handler, which is fired when a user clicks reset game
  const resetHandler = () => {
    onReset();
    reset();
  }



  // When window is done loading we call the init, for animation purposes.
  window.onload = function(){
    // Init Game
    init();
  }
