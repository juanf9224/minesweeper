var TOP_LEFT_CORNER = 'top-left-corner';
var TOP_RIGHT_CORNER = 'top-right-corner';
var BOTTOM_LEFT_CORNER = 'bottom-left-corner';
var BOTTOM_RIGHT_CORNER = 'bottom-right-corner';
var LEFT_BORDER = 'left-border';
var RIGHT_BORDER = 'right-border';
var TOP_BORDER = 'top-border';
var BOTTOM_BORDER = 'bottom-border';

document.addEventListener('DOMContentLoaded', function(){
	
	buildBoard(5,8);
	addElementAttributes();
	
});

function buildBoard(rows, cols){
	var board = [rows, cols];
	for(var i=0; i< board[0]; i++){
		
	}
}

function addElementAttributes()
{
	var rows = document.getElementsByClassName('row');	
	for(var i = 0; i < rows.length; i++){				
			var row = rows.item(i);		
			//var indexClass =  (i+1);
			//row.className += ' '+ indexClass;
		for(var j = 0; j < rows.item(i).childElementCount; j++){				
			var cells = rows.item(i).getElementsByClassName('cell');
			var cell = cells.item(j);		
			var structure = {
				board: [
				]
			};

			structure.board.push({
				cell: {
					id: '',
					classess: '',
					
				}
			});
			setBombsAndBlanks(cell);
		}
	}
}

function findBomb(item){
	workMagic(item);
}

function workMagic(item){
    var itemObject = getItemObject(item);

	console.log('BoardStructure -> '+ JSON.stringify(itemObject));
	
    var bombCount =0;
    if(!itemObject.isBomb){
		console.log(itemObject.sides.length);
		/*for(var i=0; i<itemObject.sides; i++)
		{	

		}
        if(itemObject.leftEle.element && !itemObject.leftEle.isBomb){
			console.log('Left Ele: '+ bombCount++);			
            workMagic(itemObject.leftEle.element);
        }
        if(itemObject.rightEle.element && !itemObject.rightEle.isBomb){
			console.log('Right Ele: '+ bombCount++);
            workMagic(itemObject.rightEle.element);
        }
        if(itemObject.bottomEle.element && !itemObject.bottomEle.isBomb){
			console.log('Bottom Ele: '+ bombCount++);
            workMagic(itemObject.bottomEle.element);
        }*/
    }else{
		var allBombs = document.getElementsByClassName('bomb');
		for(var i=0; i < allBombs.length; i++){
			allBombs.item(i).classList.add('show-bomb');
		}
	}
}

function getItemObject(item){
	var rowCellArr = item.getAttribute('id').split('_');
    var classArr =  item.classList;
    var row = rowCellArr[0] * 1;
    var cell = rowCellArr[1] * 1;
	var right = document.getElementById(row+'_'+(cell+1));
	var left = document.getElementById(row+'_'+(cell+1));
	var bottom = document.getElementById((row+1)+'_'+cell);
	var top = document.getElementById((row-1)+'_'+cell);
	var bottomRight = document.getElementById((row+1)+'_'+(cell+1));
	var bottomLeft = document.getElementById((row+1)+'_'+(cell-1));
	var topRight = document.getElementById((row-1)+'_'+(cell+1));
	var topLeft = document.getElementById((row-1)+'_'+(cell-1));
    var itemObject = 
    {
        eleRow: row,
        eleCell: cell,
        element: document.getElementById(row+'_'+cell) || null,
		sides:[
				{
					element: left || null,
					isBomb: left !== null? left.classList.contains('bomb'): false
				},
				{
					element: right || null,
					isBomb: right !== null? right.classList.contains('bomb'):false
				},
				{
					element: bottom || null,
					isBomb: bottom !== null? bottom.classList.contains('bomb'): false
				},
				{
					element: bottomRight || null,
					isBomb: bottomRight !== null? bottomRight.classList.contains('bomb'): false
				},
				{
					element: bottomLeft || null,
					isBomb: bottomLeft !== null? bottomLeft.classList.contains('bomb'): false
				},
				{
					element: top || null,
					isBomb: top !== null? top.classList.contains('bomb') : false
				},
				{
					element: topLeft || null,
					isBomb: topLeft !== null? topLeft.classList.contains('bomb') : false
				},
				{
					element: topRight || null,
					isBomb: topRight !== null? topRight.classList.contains('bomb'): false
				},
			],
        isBomb: classArr.contains('bomb')? true: false
    };

	return itemObject;
}

function getCornerPosition(idxId)
{
	if(idxId === '1_1')
	{
		return TOP_LEFT_CORNER;
	}
	if(idxId === '1_30')
	{
		return TOP_RIGHT_CORNER;
	}
	if(idxId === '16_1')
	{
		return BOTTOM_LEFT_CORNER;				
	}
	if(idxId === '16_30')
	{
		return BOTTOM_LEFT_CORNER;				
	}
	return "";
}

function getBorderElements(pos)
{
	console.log(pos.getAttribute('id')+' end '+ pos.getAttribute('id').endsWith('_1') && !pos.classList.contains(TOP_LEFT_CORNER) && !pos.classList.contains(BOTTOM_LEFT_CORNER));
	if(pos.getAttribute('id').endsWith('_1') && !pos.classList.contains(TOP_LEFT_CORNER) && !pos.classList.contains(BOTTOM_LEFT_CORNER))
	{	
		return LEFT_BORDER;
	}
	if(pos.getAttribute('id').endsWith('_30') && !pos.classList.contains(TOP_RIGHT_CORNER) && !pos.classList.contains(BOTTOM_RIGHT_CORNER))
	{
		//console.log('right ');
		return RIGHT_BORDER;
	}
	if(pos.getAttribute('id').startsWith('1_') && !pos.classList.contains(TOP_LEFT_CORNER) && !pos.classList.contains(TOP_RIGHT_CORNER))
	{
		//console.log('top ');
		return TOP_BORDER;
	}
	if(pos.getAttribute('id').startsWith('16_') && !pos.classList.contains(BOTTOM_LEFT_CORNER) && !pos.classList.contains(BOTTOM_RIGHT_CORNER))
	{
		//console.log('bottom ');
		return BOTTOM_BORDER;
	}

	return "";
}

function setBombsAndBlanks(cell)
{
	//console.log('cell'+ cell)
	var random = Math.floor(Math.random() * 100);			
	//console.log(random);			
	if(random < 25)
	{
		cell.className += ' bomb';
	}
	else
	{
		cell.className += ' blank';
	}
}



