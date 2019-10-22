const NoTeam = .5;
const TeamA = -5;
const TeamB = 5;


// 0 = Player A
// .5 = Empty
// 1 = Player B


const Game = new function() {
  const This = {
    board: BoardConstructor(),
    turn: 0,
    reset: resetGame
  }

  function resetGame() {
    This.board = BoardConstructor();
  }



  return This;
}



function BoardConstructor() {
  const Board = createArray(5, 5, NoTeam);

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
      if (_row[y] == NoTeam) continue;
      if (index < y) continue;
      index = y;
    }
    return index;
  }



  Board.calcScore = function() {
    const rows = getAllRows(Board);
    let scoreA = 0;
    let scoreB = 0;
    for (row of rows) 
    {
      switch (row.type)
      {
        case 1: scoreA++; break;
        default: scoreB++; break;
      }
    }
    return {scoreA: scoreA, scoreB: scoreB}
  }


  function getAllRows(_board) {
    let inARows = [];
    for (let x = 0; x < _board.length; x++) 
    {
      for (let y = 0; y < _board[x].length; y++) 
      {
        let rows = getRowsFromTile(_board, x, y);

        for (row of rows) 
        {
          let found = false;
          for (existsRow of inARows)
          {
            if (
              row.sx == existsRow.ex && 
              row.sy == existsRow.ey && 
              row.ex == existsRow.sx &&
              row.ey == existsRow.sy
            ) found = true;
          }
          if (found) continue;
          inARows.push(row);
        }
      }
    }

    return inARows;
  }

  function getRowsFromTile(_board, _startX, _startY) {
    let lines = [];
    recurse(_board, _startX, _startY);

    return lines;

    function recurse(_board, _x, _y, _dir, _step = 1) {
      if (_step == 3) lines.push({sx: _startX, sy: _startY, ex: _x, ey: _y, type: _board[_startX][_startY]});
      let neighbours = getOwnTypeNeighbours(_board, _x, _y);
      for (neighbour of neighbours)
      {
        let dir = dirFromDxDy(neighbour.x - _x, neighbour.y - _y);
        if (_dir && _dir != dir) continue;
        recurse(_board, neighbour.x, neighbour.y, dir, _step + 1);
      }
    }
  }


  function getOwnTypeNeighbours(_board, _x, _y) {
    let neighbours = [];
    let type = _board[_x][_y];
    
    if (type == NoTeam) return neighbours;


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




Drawer.drawBoard(Game.board);
let list = Trainer.createRandomAIs(100)

let running = true;
let round = 0;
function run() {round++; list = Trainer.compareAIList(list); if (running) setTimeout(run, 1);} run();











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

