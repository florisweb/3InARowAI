


// 0 = Player A
// .5 = Empty
// 1 = Player B


const Game = new function() {
  const This = {
    board: BoardConstructor()
  }



  return This;
}




function BoardConstructor() {
  const Board = createArray(5, 5, .5);

  Board.placeStone = function(_x, _team = 0) {
    let yIndex = getHighestStoneByRow(Board[_x]);
    if (yIndex === 0) return false;
    Board[_x][yIndex - 1] = _team;
    return true;
  }



  function getHighestStoneByRow(_row) {
    let index = _row.length;
    for (let y = _row.length - 1; y >= 0; y--)
    {
      if (_row[y] == .5) continue;
      if (index < y) continue;
      index = y;
    }
    return index;
  }





  Board.getThreeInARows = getThreeInARows;
  function getThreeInARows(_board) {
    let inARows = [];
    for (let x = 0; x < _board.length; x++) 
    {
      for (let y = 0; y < _board[x].length; y++) 
      {
        console.log(_board[x][y], getInARow(_board, x, y));
      }
    }

    return inARows;
  }

  Board.getInARow = getInARow;
  function getInARow(_board, _x, _y) {
    
    

    let lines = [];
    recurse(_board, _x, _y);

    return lines;

    function recurse(_board, _x, _y, _dir, _step = 1) {

      console.log(_x, _y, _dir, _step);
      if (_step > 2) lines.push({x: _x, y: _y, dir: _dir});
      let neighbours = getOwnTypeNeighbours(_board, _x, _y);
      for (neighbour of neighbours)
      {
        let dir = dirFromDxDy(neighbour.x - _x, neighbour.y - _y);
        if (_dir && _dir != dir) continue;
        recurse(_board, neighbour.x, neighbour.y, dir, _step + 1);
      }
    }
  }



  Board.getOwnTypeNeighbours = getOwnTypeNeighbours;

  function getOwnTypeNeighbours(_board, _x, _y) {
    let neighbours = [];
    let type = _board[_x][_y];
    
    if (type == .5) return neighbours;


    if (_x > 0 && _board[_x - 1][_y] == type)                                                     neighbours.push({x: _x - 1, y: _y});
    if (_x < _board.length - 1 && _board[_x + 1][_y] == type)                                     neighbours.push({x: _x + 1, y: _y});
    
    if (_y > 0 && _board[_x][_y - 1] == type)                                                     neighbours.push({x: _x, y: _y - 1});
    if (_y < _board[_x].length - 1 && _board[_x][_y + 1] == type)                                 neighbours.push({x: _x, y: _y + 1});


    if (_x > 0 && _y > 0 && _board[_x - 1][_y - 1] == type)                                       neighbours.push({x: _x - 1, y: _y - 1});
    if (_x < _board.length - 1 && _y < _board[_x].length - 1 && _board[_x + 1][_y + 1] == type)   neighbours.push({x: _x + 1, y: _y + 1});

    if (_x > 0 && _y < _board[_x].length - 1 && _board[_x - 1][_y + 1] == type)                   neighbours.push({x: _x - 1, y: _y + 1});
    if (_x < _board.length - 1 && _y > 0 && _board[_x + 1][_y - 1] == type)                       neighbours.push({x: _x + 1, y: _y - 1});

    return neighbours;
  }


  return Board;
}




Game.board.placeStone(0, 1);
Game.board.placeStone(0, 1);
Game.board.placeStone(2, 1);
Game.board.placeStone(1, 1);
Game.board.placeStone(1, 1);
Game.board.placeStone(2, 1);
Game.board.placeStone(2, 1);
Drawer.drawBoard(Game.board);



function createArray(_width, _height, _value) {
  let arr = [];
  for (let x = 0; x < _width; x++)
  {
    arr[x] = [];
    for (let y = 0; y < _height; y++)
    {
      arr[x][y] = _value;
    }
  }

  return arr;
}



function dirFromDxDy(_dx, _dy) {
  if (_dx == -1 && _dy == -1) return 1;
  if (_dx == 0 && _dy == -1)  return 2;
  if (_dx == 1 && _dy == -1)  return 3;
  if (_dx == 1 && _dy == 0)   return 4;
  if (_dx == 1 && _dy == 1)   return 5;
  if (_dx == 0 && _dy == 1)   return 6;
  if (_dx == -1 && _dy == 1)  return 7;
  if (_dx == -1 && _dy == 0)  return 8;
  return false;
}

