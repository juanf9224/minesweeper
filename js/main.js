var TOP_LEFT_CORNER = 'top-left-corner';
var TOP_RIGHT_CORNER = 'top-right-corner';
var BOTTOM_LEFT_CORNER = 'bottom-left-corner';
var BOTTOM_RIGHT_CORNER = 'bottom-right-corner';
var LEFT_BORDER = 'left-border';
var RIGHT_BORDER = 'right-border';
var TOP_BORDER = 'top-border';
var BOTTOM_BORDER = 'bottom-border';

document.addEventListener('DOMContentLoaded', function(){

	addElementAttributes();
	
});

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
    var rowCellArr = item.getAttribute('id').split('_');
    var classArr =  item.classList;
    var row = rowCellArr[0] * 1;
    var cell = rowCellArr[1] * 1;
    var itemObject = 
    {
        eleRow: row,
        eleCell: cell,
        element: document.getElementById(row+'_'+cell) || null,
        leftEle: document.getElementById(row+'_'+(cell-1)) || null,
        rightEle: document.getElementById(row+'_'+(cell+1)) || null,
        bottomEle: document.getElementById((row+1)+'_'+cell) || null,
        bottomRightEle: document.getElementById((row+1)+'_'+(cell+1)) || null,
        bottomLeftEle: document.getElementById((row+1)+'_'+(cell-1)) || null,
        topEle: document.getElementById((row-1)+'_'+cell) || null,
        topLeftEle: document.getElementById((row-1)+'_'+(cell-1)) || null,
        topRightEle: document.getElementById((row-1)+'_'+(cell+1)) || null,
        isBomb: classArr.contains('bomb')? true: false
    };

	console.log('BoardStructure -> '+ JSON.stringify(itemObject));
    var bombCount =0;
    if(!itemObject.isBomb){
        if(itemObject.leftEle){
			console.log('Left Ele: '+ bombCount++);
            workMagic(itemObject.leftEle);
        }
        if(itemObject.rightEle){
			console.log('Right Ele: '+ bombCount++, document.getElementById(row+'_'+(cell+1)));
            workMagic(itemObject.rightEle);
        }
        if(itemObject.bottomEle){
			console.log('Bottom Ele: '+ bombCount++);
            workMagic(itemObject.bottomEle);
        }
    }    
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



