document.addEventListener('DOMContentLoaded', function(){
	var rows = document.getElementsByClassName('row');

	for(var i = 1; i <= rows.length; i++){
		for(var j = 1; j <= rows.item(i).childElementCount; j++){				
			var cells = rows.item(i).getElementsByClassName('cell');		
			cells.item(j).className += ' '+ i +'_'+j ;
		}
	}
})