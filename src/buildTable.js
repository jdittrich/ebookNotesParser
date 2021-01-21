/**
* 
* @param {object[]} table
* @param {string} table[].   - title of the ebook
* @param {string} table[].date - when the note was made
* @param {string} table[].page – page the note was made on
* @param {string} table[].type – type of the note (e.g. selection, note, bookmark…)
* @param {string} table[].content – content of the note. 
*/
 
function buildDOMTable(table){
    const domTable = document.createElement("table");
    const firstRow = document.createElement("tr");
    

    function createDomRow(columns=[],colTag="td"){ 
        const domRow = document.createElement("tr");

        columns.forEach(function(element){
            const domColumn = document.createElement(colTag);
            const domText = document.createTextNode(element);
            domColumn.appendChild(domText);
            domRow.appendChild(domColumn);
        })
        return domRow;
    }

    domTable.appendChild(createDomRow(Object.keys(table[0]),"th"));
    
    table.forEach(function(tableRow){
        domTable.appendChild(createDomRow(Object.values(tableRow)));    
    })
    return domTable;    
}


export default buildDOMTable
