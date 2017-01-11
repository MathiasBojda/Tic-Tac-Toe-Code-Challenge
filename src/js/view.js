const board = document.getElementById("app");
const content = document.getElementById("content");
let tiles = [];

// Updates an tiles view
export const updateTileView = ( args ) => {
  var player = args[1] === true ? '2' : '1';
  tiles[args[0]].className = 'tile player-' + player;
}

// View init
export const viewInit = (gameState, func) => {
    gameState.state.forEach ( (value, index) => {
      const elem = document.createElement('div')
      elem.className = 'tile';
      elem.onclick = func.bind(null, value, index);
      tiles.push(elem);
      board.appendChild(elem);
  })

  document.getElementById("app").className = 'active';
}


//Hide the overlay winner view
export const hideOverlay = () => {
  document.getElementById("overlay").className = '';
  content.innerHTML = "";
}

// Display the overlay winner view
export const showOverlay = () => {
  document.getElementById("overlay").className = 'active';
}

// Get's called if the game ends
export const updateOverlay = (text, resetHandler) => {
    let content = document.getElementById("content");
    let resetButton = document.createElement('a');
    resetButton.onclick = () => {
      resetHandler();
      resetTiles();
      hideOverlay();
    }
    resetButton.innerHTML = 'Play again?';
    content.innerHTML = "<div>" + text + "</div>";
    content.appendChild(resetButton);
}


// Reset the tiles views
export const resetTiles = () => {
    tiles.forEach ((value) => {
        value.className = 'tile';
    });
};

// Updates the view, everytime a tile is clicked or AI makes a move.
const updateView = (index) => {
  var player = currentPlayer === AI ? '2' : '1';
  tiles[index].className = 'tile player-' + player;
}
