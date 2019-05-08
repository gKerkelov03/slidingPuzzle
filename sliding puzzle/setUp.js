const canvas = document.getElementById("canvas"),
	movesCanvas = document.getElementById("movesCanvas"),
	makePuzzleButton = document.getElementById("makePuzzleButton"),
	container = document.getElementById("container"),
    submitInfo = document.getElementById("submitInfo"),
	imageSource = document.getElementById("imageSource"),
	dropDown = document.getElementById("dropDown"),
	ctx = canvas.getContext("2d");
	mctx = movesCanvas.getContext("2d");

canvas.width = window.innerHeight - 1;
canvas.height = window.innerHeight - 1;
canvas.style.left = window.innerWidth / 2 - canvas.width / 2 - makePuzzleButton.scrollWidth + "px";

movesCanvas.style.position = "relative";
movesCanvas.style.right = canvas.width + movesCanvas.width / 2 + 30 +  "px";
movesCanvas.style.bottom = canvas.width - movesCanvas.height - 10 +  "px";

container.style.position = "relative";
container.style.bottom = window.innerHeight - container.clientHeight + "px"
container.style.left = window.innerWidth / 2 - 110 + "px";
container.style.display = "none";
	
makePuzzleButton.style.left = window.innerWidth - 20 - makePuzzleButton.scrollWidth + "px";
makePuzzleButton.style.bottom = window.innerHeight - 7 - makePuzzleButton.scrollHeight + "px";
 
const colors = {
		stroke : "white",
		fill : "rgba(22, 230, 137, 1)",
		missing : "white",
		text : "white" 
	},
	pixelSizesMap = {
		3 : 100,
		4 : 90,
		5 : 75,
		6 : 65,
		7 : 57,
		8 : 45,
		9 : 35,
		10 : 30,
		mctx : 40,
	},
	firstGameDifficulty = 3,
	lineWidth = 13;

let currentSquaresSide = canvas.width / firstGameDifficulty,
	gameType = "default",
	currentGrid = [],
	currentDifficulty = firstGameDifficulty,
	isEnteredSourceValid = false;
	currentImage = null,
	shouldListen = true,
	moves = 0,
	shouldDrawFullPicture = false,
	currentImageSquaresSizes = {
		width : 0,
		height : 0
	};

