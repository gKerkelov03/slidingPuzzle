class Square {
    constructor(x, y, number, startX, startY){
        this.x = x;
        this.y = y;
        this.number = number;     
        this.startX = startX;
        this.startY = startY; 
        this.isMissing = false;
    }

    draw(){		
        if(this.isMissing){
            ctx.fillStyle = colors.missing;
            ctx.fillRect(this.x, this.y, currentSquaresSide, currentSquaresSide);
            return;
        }

        ctx.strokeStyle = colors.stroke;
        ctx.fillStyle = colors.fill;

		if(gameType === "default"){
            ctx.lineWidth = lineWidth - currentDifficulty;        
            ctx.fillRect(this.x, this.y, currentSquaresSide, currentSquaresSide);            
			ctx.strokeRect(this.x, this.y, currentSquaresSide, currentSquaresSide);
		}
		else {
            ctx.lineWidth = 3;        
            ctx.drawImage(currentImage, this.startX, this.startY, currentImageSquaresSizes.width, currentImageSquaresSizes.height, this.x, this.y, currentSquaresSide, currentSquaresSide);
            
            if(!shouldDrawFullPicture){
                ctx.strokeRect(this.x, this.y, currentSquaresSide, currentSquaresSide);
            }
		}         
    }

    drawNumber(){
        if(this.isMissing){
            return;
        }

        let x;
        if(gameType === "default"){        
            ctx.font = pixelSizesMap[currentDifficulty] + "px Arial";
            ctx.fillStyle = colors.text;   
            
            switch (currentDifficulty) {
                case 3:
                    ctx.fillText(this.number, this.x + 80, this.y + currentSquaresSide * (3 / 4) - 10);
                    break;
                case 4:
                    x = (this.number + "").length === 1 ? 57 : 30;                    
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4));
                    break;
                case 5:
                    x = (this.number + "").length === 1 ? 45 : 20;                    
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4));
                    break;
                case 6:
                    x = (this.number + "").length === 1 ? 35 : 18;                    
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4));
                    break;
                case 7:
                    x = (this.number + "").length === 1 ? 30 : 15;                    
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4));
                    break;
                case 8:
                    x = (this.number + "").length === 1 ? 27 : 15;                    
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4) - 3);
                    break;
                case 9: 
                    x = (this.number + "").length === 1 ? 25 : 16;                    
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4) - 5);
                    break;  
                case 10:
                    x = (this.number + "").length === 1 ? 25 : (this.number + "").length === 2 ? 16 : 6;
                    ctx.fillText(this.number, this.x + x, this.y + currentSquaresSide * (3 / 4) - 5);
                    break;
            }
        }
        else if(!shouldDrawFullPicture){
            ctx.font = currentSquaresSide / (currentDifficulty > 4 ? 5 : 6) + "px Arial";
            ctx.fillStyle = colors.text;
            
            ctx.fillText(this.number, this.x + 9 - (this.number + "").length * 2, this.y + parseFloat(ctx.font) + 3);
        }
    }
}