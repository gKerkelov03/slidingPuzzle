const createGrid = (type) => {    
    let grid = [];

    for(let row = 0; row < currentDifficulty; row++){
        grid[row] = [];

        for(let col = 0; col < currentDifficulty; col++){
            if(type === "default"){
                grid[row].push(new Square(col * currentSquaresSide, row * currentSquaresSide, col + row * currentDifficulty + 1));
            }
            else {
                grid[row].push(new Square(col * currentSquaresSide, row * currentSquaresSide, col + row * currentDifficulty + 1, col * currentImageSquaresSizes.width, row * currentImageSquaresSizes.height))
            }
        }
    }

    return grid;
},
drawGrid = () => currentGrid.forEach(row => row.forEach(cell => {
    cell.draw();
    cell.drawNumber();
})),
shuffleGrid = () => {
    let row = currentGrid.length - 1,
        col = currentGrid.length - 1;

    for(let i = 0; i < (currentDifficulty + 0.1) * 100; i++){
        currentGrid[row][col].isMissing = false;

        var r = Math.random() < 0.35 ? -1 : random(0, 2),
            c = Math.random() < 0.35 ? -1 : random(0, 2);

        while(!isValid(row + r)){
            r = Math.random() < 0.35 ? -1 : random(0, 2);
        }

        while(!isValid(col + c)){
            c = Math.random() < 0.35 ? -1 : random(0, 2);
        }

        swap({ row, col }, { row : row + r, col: col + c });        
        
        row += r;
        col += c;

        currentGrid[row][col].isMissing = true;
    }    
},
checkForWin = () => {
    for(let row = 0; row < currentGrid.length; row++){
        for(let col = 0; col < currentGrid.length; col++){
            if(currentGrid[row][col].number !== col + row * currentDifficulty + 1){
                return;
            }
        }    
    }

    currentGrid[currentDifficulty - 1][currentDifficulty - 1].isMissing = false;
    drawGrid();

    if(confirm("Well Done! Do you want to play again?")){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createGame(gameType, currentDifficulty)
    }
    else {        
        shouldDrawFullPicture = true;  
        drawGrid();              
    }
}, 
clickAnimation = (button) => {
    if(!button.style.bottom){
        button.style.position = "relative";
        button.style.bottom = "0px";
    }
    button.style.bottom = parseFloat(button.style.bottom) - 5 + "px";
    
    setTimeout(() => {
        button.style.bottom = parseFloat(button.style.bottom) + 5 + "px";
    }, 50);
},
findClickedSquare = (x, y) => {
    x -= (window.innerWidth / 2 - canvas.width / 2);
    
    for(let row = 0; row < currentGrid.length; row++){
        for(let col = 0; col < currentGrid.length; col++){  
            if(x >= currentGrid[row][col].x && x <= currentGrid[row][col].x + currentSquaresSide && y >= currentGrid[row][col].y && y <= currentGrid[row][col].y + currentSquaresSide){
                if(currentGrid[row][col].isMissing){
                    return;
                }              

                return { row , col };
            }           
        }    
    }
},
drawMoves = () => {
    mctx.clearRect(0, 0, movesCanvas.width, movesCanvas.height);
    mctx.fillStyle = colors.text;
    mctx.font = pixelSizesMap.mctx + "px Trebuchet MS";
    mctx.fillText("Moves: " + moves, pixelSizesMap.mctx - 10, pixelSizesMap.mctx);
},
swap = (coords1, coords2) => {
    let temp = currentGrid[coords1.row][coords1.col];
    currentGrid[coords1.row][coords1.col] = currentGrid[coords2.row][coords2.col];
    currentGrid[coords2.row][coords2.col] = temp;

    let tempX = currentGrid[coords1.row][coords1.col].x;
    currentGrid[coords1.row][coords1.col].x = currentGrid[coords2.row][coords2.col].x;
    currentGrid[coords2.row][coords2.col].x = tempX;

    let tempY = currentGrid[coords1.row][coords1.col].y;
    currentGrid[coords1.row][coords1.col].y = currentGrid[coords2.row][coords2.col].y;
    currentGrid[coords2.row][coords2.col].y = tempY;
},
swapWithMissing = (coords) => {
    let row, col;

    if(isValid(coords.row - 1) && currentGrid[coords.row - 1][coords.col].isMissing){
        row = coords.row - 1;
        col = coords.col;
    }    
    else if(isValid(coords.row + 1) && currentGrid[coords.row + 1][coords.col].isMissing){
        row = coords.row + 1;
        col = coords.col;

    }    
    else if(isValid(coords.col - 1) && currentGrid[coords.row][coords.col - 1].isMissing){
        row = coords.row;
        col = coords.col - 1;

    }
    else if(isValid(coords.col + 1) && currentGrid[coords.row][coords.col + 1].isMissing){
        row = coords.row;
        col = coords.col + 1;
    }

    if(row !== undefined){
        swap({ row : coords.row, col : coords.col }, { row, col });
        moves++;
    }
},
isValid = (index) => index >= 0 && index < currentGrid.length,
random = (min, max) => (Math.random() * (max - min) + min) | 0,
createGame = (type, dificulty) => {
    moves = 0;
    shouldDrawFullPicture = false;
    currentDifficulty = +dificulty;
    currentSquaresSide = canvas.width / currentDifficulty;

    if(type === "default"){
        currentImage = null;
        gameType = "default";
        currentGrid = createGrid("default");
    }
    else {
        currentImageSquaresSizes.width = currentImage.width / currentDifficulty;
        currentImageSquaresSizes.height = currentImage.height / currentDifficulty;

        gameType = "";
        currentGrid = createGrid();
    }
    
    shuffleGrid();
    drawGrid();
    drawMoves();
}

