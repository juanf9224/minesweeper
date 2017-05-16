var TOP_LEFT_CORNER = 'top-left-corner';
var TOP_RIGHT_CORNER = 'top-right-corner';
var BOTTOM_LEFT_CORNER = 'bottom-left-corner';
var BOTTOM_RIGHT_CORNER = 'bottom-right-corner';
var LEFT_BORDER = 'left-border';
var RIGHT_BORDER = 'right-border';
var TOP_BORDER = 'top-border';
var BOTTOM_BORDER = 'bottom-border';

document.addEventListener('DOMContentLoaded', function(){
	
	buildBoard(10,8);
	addElementAttributes();
	
});

function buildBoard(rows, cols){
	//<td onclick="findBomb(this)" class="cell top-left-corner" id="1_1">
	//<tr id="1" class="row">

	var board = [rows, cols];
	for(var i=1; i<= board[0]; i++){
		var trElement = document.createElement('tr');
		trElement.setAttribute('id', (i));
		trElement.classList.add('row');
		var boardElement = document.getElementById('game-table');
		boardElement.appendChild(trElement);
		for(var j=1; j<=board[1]; j++){
			var tdElement = document.createElement('td');
			tdElement.setAttribute('id', i +'_'+ j);
			tdElement.setAttribute('onclick', 'findBomb(this)');
			tdElement.classList.add('col');
			var tr = document.getElementById(i);
			tr.appendChild(tdElement);
		}
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
			var cells = rows.item(i).getElementsByClassName('col');
			var cell = cells.item(j);		
			setBombsAndBlanks(cell);
		}
	}
}

function findBomb(item){
	workMagic(item);
}

function workMagic(item){
    var itemObject = getItemObject(item);

	//console.log('BoardStructure -> '+ JSON.stringify(itemObject));
	
    var bombCount =0;
    if(!itemObject.isBomb){
		console.log(itemObject.sides.length);
		var bombCount = 0;
		for(var s=0; s<itemObject.sides.length; s++){
			var side = itemObject.sides[s];
			if(side.element && !side.isBomb){

			}else if(side.element && side.isBomb){
				console.log(side.element);
				bombCount++;
			}
		}

		if(bombCount > 0){			
			var bombsAround = document.createTextNode(bombCount);
			itemObject.element.appendChild(bombsAround);
		}
    }else{
		var allBombs = document.getElementsByClassName('bomb');
		for(var i=0; i < allBombs.length; i++){
			allBombs.item(i).classList.add('show-bomb');
		}
		var disableTd = document.getElementsByClassName('col');
		for(var n=0; n < disableTd.length; n++){
			disableTd.item(n).removeAttribute('onclick');
		}
	}
}

function getItemObject(item){
	var rowCellArr = item.getAttribute('id').split('_');
    var classArr =  item.classList;
    var row = rowCellArr[0] * 1;
    var cell = rowCellArr[1] * 1;
	var right = document.getElementById(row+'_'+(cell+1));
	var left = document.getElementById(row+'_'+(cell-1));
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
	console.log(pos.getAttribute('id')+' end '+ (pos.getAttribute('id').endsWith('_1') && !pos.classList.contains(TOP_LEFT_CORNER) && !pos.classList.contains(BOTTOM_LEFT_CORNER)));
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
		cell.classList.add('bomb');
	}
}



