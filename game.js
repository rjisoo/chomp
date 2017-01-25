var gameOfLife = {
  
  width: 12, 
  height: 12, // width and height dimensions of the board

  createAndShowBoard: function () {
    
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    for (let i = 0; i < gameOfLife.width; i++) {
      for (let j = 0; j < gameOfLife.height; j++) {
        let thisCell = gameOfLife.selectCell(i, j);
        iteratorFunc(thisCell, i, j)
      }
    }
  },
  
  setupBoardEvents: function() {
    gameOfLife.forEachCell(cell => {
      cell.addEventListener('click', gameOfLife.toggleCellStatus.bind(this, cell));
    })
    document.getElementById('clear_btn').addEventListener('click', gameOfLife.clear.bind(this));
    document.getElementById('set_own').addEventListener('click', gameOfLife.newSize.bind(this));
    document.getElementById('resetAll').addEventListener('click', gameOfLife.resetBoard.bind(this));
    document.getElementById('0-0').addEventListener('click', gameOfLife.lose.bind(this));
  },

  setCellStatus: function (cell, status) {
    cell.setAttribute('data-status', status);
    cell.className = status;
  },
  selectCell: function (pX, pY) {
    return document.getElementById(pX + '-' + pY);
  },

  getCellCoords: function (cellElement) {
    // Arr of x and y
    return cellElement.id.split('-').map(Number)
  },
  toggleCellStatus: function(cell) {
    var xy = gameOfLife.getCellCoords(cell)
    var x = xy[0];
    var y = xy[1];

    gameOfLife.forEachCell(function (cell, i, j) {
      if (i >= x && y <=j) {
        var cellToKill = gameOfLife.selectCell(i, j)
        gameOfLife.setCellStatus(cellToKill, 'dead')
      }
    })
  },
  clear: function() {
    gameOfLife.forEachCell(cell => {
      gameOfLife.setCellStatus(cell, 'alive');
    })
  },
  newSize: function() {
    var newWidth = document.getElementById('newWidth').value;
    var newHeight = document.getElementById('newHeight').value;

     if(newWidth > 50 || newHeight >50){
        return alert("Number too large!");
      }

     this.width = newWidth > 0 ? newWidth :1  ;
      this.height = newHeight > 0 ? newHeight :1 ;


     var board = document.getElementById('board');
      board.innerHTML = "";
      this.createAndShowBoard();
  },
  resetBoard: function(){
    this.width = 12;
    this.height = 12;

    var board = document.getElementById('board');
    board.innerHTML = "";
    this.createAndShowBoard();
  },
  lose: function() {
    alert('LOSER')
  }
};

gameOfLife.createAndShowBoard();
