


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
  const Board = [];

  for (let x = 0; x < 5; x++)
  {
    Board[x] = [];
    for (let y = 0; y < 5; y++)
    {
      Board[x][y] = .5;
    }
  }


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

  function getInARow(_board, _x, _y) {



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



