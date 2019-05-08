
currentGrid = createGrid("default");
shuffleGrid();

drawGrid();
drawMoves();

makePuzzleButton.onclick = () => {
	shouldListen = false;
	clickAnimation(makePuzzleButton);
	imageSource.value = "";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	currentImage = null;
	container.style.display = "block";
	
	moves = 0;
	drawMoves();
};

submitInfo.onclick = () => {
	let type = "";

	clickAnimation(submitInfo);
	container.style.display = "none";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if(!isEnteredSourceValid){
		type = "default"; 
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	shouldListen = true;
	createGame(type, dropDown.value);

	return false;
};

imageSource.oninput = () => {
	currentImage = new Image();
	currentImage.src = imageSource.value;

	isEnteredSourceValid = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	currentImage.onload = () => {
		ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
		isEnteredSourceValid = true;
	};
};

window.addEventListener("click", (event) => {
	if(shouldListen){
		let clickedCellCoords = findClickedSquare(event.clientX, event.clientY);
	
		if(clickedCellCoords){
			swapWithMissing(clickedCellCoords);
			drawGrid();
			drawMoves();
			checkForWin();
		}
	}
});
