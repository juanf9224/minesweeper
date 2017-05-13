var row = 1;
var cell = 2;


function workMagic(item){
    var rowCellArr = item.getAttribute('id').split('_');
    var classArr =  item.classList.split(',');
    var row = rowCellArr[0] * 1;
    var cell = rowCellArr[1] * 1;
    console.log(classArr, rowCellArr);
    var boardStructure = 
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
        isBomb: false
    };
    var bombCount =0;
    if(!item.isBomb){
        if(item.leftEle){
            
        }
    }    
}