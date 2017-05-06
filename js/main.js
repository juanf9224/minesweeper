var TOP_LEFT_CORNER = 'top-left-corner';
var TOP_RIGHT_CORNER = 'top-right-corner';
var BOTTOM_LEFT_CORNER = 'bottom-left-corner';
var BOTTOM_LEFT_CORNER = 'bottom-right-corner';
var LEFT_BORDER = 'left-border';
var RIGHT_BORDER = 'right-border';
var TOP_BORDER = 'top-border';
var BOTTOM_BORDER = 'bottom-border';

document.addEventListener('DOMContentLoaded', function(){
	var rows = document.getElementsByClassName('row');

	for(var i = 0; i < rows.length; i++){				
			var row = rows.item(i);		
			var indexClass =  (i+1);
			row.className += ' '+ indexClass;
		for(var j = 0; j < rows.item(i).childElementCount; j++){				
			var cells = rows.item(i).getElementsByClassName('cell');
			var cell = cells.item(j);		
			var indexClass =  (i+1) +'_'+(j+1);
			cell.setAttribute('id', indexClass) // .className += ' '+ indexClass;
			cell.classList += ' '+ getCornerPosition();
			var random = Math.floor(Math.random() * 100);			
			console.log(random);			
			if(random < 25)
			{
				cell.className += ' bomb';
			}
			else
			{
				cell.className += ' blank';
			}
		}
	}
});

function getCornerPosition()
{
	if((i+1) === 1 && (j+1) === 1)
	{
		return TOP_LEFT_CORNER;
	}
	if((i+1) === 1 && (j+1) === 30)
	{
		return TOP_RIGHT_CORNER;
	}
	if((i+1) === 16 && (j+1) === 1)
	{
		return BOTTOM_LEFT_CORNER;				
	}
	if((i+1) === 16 && (j+1) === 30)
	{
		return BOTTOM_LEFT_CORNER;				
	}
}

function findBomb(item){
	var balnkCount = 0;				

	if(item.parentElement.classList.contains('1') && !item.classList.contains('bomb')){
			alert('this cell is inside the first row. Cell is: '+ item.getAttribute('id'));
	}
}



