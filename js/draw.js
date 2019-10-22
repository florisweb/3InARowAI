


// 0 = Player A
// .5 = Empty
// 1 = Player B


const Drawer = new function() {
  const Canvas = gameCanvas;
  const ctx = Canvas.getContext("2d");
  const tileSize = Canvas.width / 5;

  const This = {
    drawBoard: drawBoard
  }


  function drawBoard(_board) {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    for (let x = 0; x < _board.length; x++)
    {
      for (let y = 0; y < _board[x].length; y++)
      {
        drawTile(x, y, _board[x][y]);
      }
    }

  }

  function drawTile(_x, _y, _team) {
    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.strokeRect(_x * tileSize, _y * tileSize, tileSize, tileSize);
    ctx.closePath();
    ctx.stroke();

    if (_team == NoTeam) return;
    

    
    ctx.fillStyle = "rgba(0, 0, 255 , .1)";
    if (_team == TeamA) ctx.fillStyle = "rgba(255, 0, 0, .1)";
    ctx.beginPath();
    ctx.fillRect(_x * tileSize, _y * tileSize, tileSize, tileSize);
    ctx.closePath();
    ctx.fill();
      

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.fillText(_team, _x * tileSize + tileSize / 2, _y * tileSize + tileSize / 2);
    ctx.closePath();
    ctx.fill();
  }


  return This;
}

